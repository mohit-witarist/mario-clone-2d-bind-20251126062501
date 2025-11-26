import { 
  CANVAS_WIDTH, CANVAS_HEIGHT, TILE_SIZE,
  GAME_STATES, LEVEL_TIME, BLOCK_TYPES 
} from './constants';
import Player from './Player';
import Level from './Level';
import Camera from './Camera';
import CollisionDetector from './CollisionDetector';
import InputHandler from './InputHandler';
import SpriteRenderer from './SpriteRenderer';
import Coin from './Coin';
import PowerUp from './PowerUp';
import Fireball from './Fireball';

class GameEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    
    this.gameState = GAME_STATES.START;
    this.score = 0;
    this.coins = 0;
    this.lives = 3;
    this.time = LEVEL_TIME;
    
    this.level = new Level();
    this.player = new Player(64, CANVAS_HEIGHT - TILE_SIZE * 3);
    this.camera = new Camera(this.level.width, this.level.height);
    this.collisionDetector = new CollisionDetector(this.level);
    this.input = new InputHandler();
    this.spriteRenderer = new SpriteRenderer(this.ctx);
    
    this.powerUps = [];
    this.fireballs = [];
    this.animatedCoins = [];
    
    this.lastTime = 0;
    this.timeAccumulator = 0;
    
    this.onStateChange = null;
  }
  
  start() {
    if (this.gameState === GAME_STATES.START) {
      this.gameState = GAME_STATES.PLAYING;
      this.notifyStateChange();
    }
  }
  
  restart() {
    this.score = 0;
    this.coins = 0;
    this.lives = 3;
    this.time = LEVEL_TIME;
    this.level.reset();
    this.player = new Player(64, CANVAS_HEIGHT - TILE_SIZE * 3);
    this.powerUps = [];
    this.fireballs = [];
    this.animatedCoins = [];
    this.camera.x = 0;
    this.gameState = GAME_STATES.PLAYING;
    this.notifyStateChange();
  }
  
  update(currentTime) {
    const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;
    
    if (this.gameState !== GAME_STATES.PLAYING) return;
    
    this.timeAccumulator += deltaTime;
    if (this.timeAccumulator >= 1) {
      this.timeAccumulator = 0;
      this.time--;
      if (this.time <= 0) {
        this.playerDeath();
      }
    }
    
    const hitBlock = this.player.update(
      this.input, 
      this.collisionDetector, 
      this.level.tiles,
      deltaTime
    );
    
    if (hitBlock) {
      this.handleBlockHit(hitBlock);
    }
    
    if (this.input.consumeFire() && this.player.canShootFireball()) {
      this.shootFireball();
    }
    
    this.level.blocks.forEach(block => block.update(deltaTime));
    
    this.level.enemies.forEach(enemy => {
      enemy.update(this.collisionDetector, this.level.tiles, deltaTime);
    });
    
    this.powerUps.forEach(powerUp => {
      powerUp.update(this.collisionDetector, this.level.tiles, deltaTime);
    });
    
    this.fireballs.forEach(fireball => {
      fireball.update(this.collisionDetector, this.level.tiles, deltaTime);
    });
    
    this.animatedCoins.forEach(coin => coin.update(deltaTime));
    this.animatedCoins = this.animatedCoins.filter(c => c.active);
    
    this.level.coins.forEach(coin => coin.update(deltaTime));
    
    this.checkCollisions();
    
    this.camera.follow(this.player);
    
    if (this.player.y > CANVAS_HEIGHT + 100) {
      this.playerDeath();
    }
    
    if (this.player.x >= this.level.width - TILE_SIZE * 3) {
      this.gameState = GAME_STATES.WIN;
      this.notifyStateChange();
    }
  }
  
  handleBlockHit(hitBlock) {
    const block = this.level.getBlockAt(hitBlock.row, hitBlock.col);
    if (block && !block.hit) {
      const content = block.hitBlock(this.level.tiles);
      
      if (content === 'coin') {
        this.coins++;
        this.score += 100;
        this.animatedCoins.push(new Coin(
          block.x + 8,
          block.y - TILE_SIZE,
          true
        ));
      } else if (content === 'mushroom') {
        this.powerUps.push(new PowerUp(
          block.x + 2,
          block.y - TILE_SIZE,
          'mushroom'
        ));
      } else if (content === 'fire_flower') {
        const type = this.player.state === 'small' ? 'mushroom' : 'fire_flower';
        this.powerUps.push(new PowerUp(
          block.x + 2,
          block.y - TILE_SIZE,
          type
        ));
      }
    }
  }
  
  shootFireball() {
    const direction = this.player.facingRight ? 1 : -1;
    const x = this.player.x + (direction > 0 ? this.player.width : -12);
    const y = this.player.y + this.player.height / 2;
    
    if (this.fireballs.filter(f => f.active).length < 2) {
      this.fireballs.push(new Fireball(x, y, direction));
    }
  }
  
  checkCollisions() {
    this.level.coins.forEach(coin => {
      if (coin.active && !coin.collected) {
        if (this.collisionDetector.checkEntityVsEntity(this.player, coin)) {
          coin.collect();
          this.coins++;
          this.score += 100;
        }
      }
    });
    
    this.powerUps.forEach(powerUp => {
      if (powerUp.active && !powerUp.emerging) {
        if (this.collisionDetector.checkEntityVsEntity(this.player, powerUp)) {
          powerUp.collect();
          this.player.getPowerUp(powerUp.type);
          this.score += 1000;
        }
      }
    });
    
    this.level.enemies.forEach(enemy => {
      if (!enemy.active || enemy.squished || enemy.dead) return;
      
      if (this.collisionDetector.checkEntityVsEntity(this.player, enemy)) {
        const direction = this.collisionDetector.getOverlapDirection(this.player, enemy);
        
        if (direction === 'bottom' && this.player.velY > 0) {
          enemy.stomp();
          this.player.velY = -8;
          this.score += 100;
        } else {
          this.playerDeath();
        }
      }
    });
    
    this.fireballs.forEach(fireball => {
      if (!fireball.active) return;
      
      this.level.enemies.forEach(enemy => {
        if (!enemy.active || enemy.squished || enemy.dead) return;
        
        if (this.collisionDetector.checkEntityVsEntity(fireball, enemy)) {
          enemy.kill();
          fireball.active = false;
          this.score += 200;
        }
      });
    });
    
    this.fireballs = this.fireballs.filter(f => f.active);
  }
  
  playerDeath() {
    const died = this.player.die();
    
    if (died) {
      this.lives--;
      
      setTimeout(() => {
        if (this.lives <= 0) {
          this.gameState = GAME_STATES.GAME_OVER;
        } else {
          this.gameState = GAME_STATES.DEAD;
        }
        this.notifyStateChange();
      }, 2000);
    }
  }
  
  respawn() {
    this.time = LEVEL_TIME;
    this.player = new Player(64, CANVAS_HEIGHT - TILE_SIZE * 3);
    this.powerUps = [];
    this.fireballs = [];
    this.camera.x = 0;
    this.gameState = GAME_STATES.PLAYING;
    this.notifyStateChange();
  }
  
  render() {
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    this.spriteRenderer.renderBackground(this.camera, this.level.width);
    
    this.spriteRenderer.renderTiles(this.level.tiles, this.camera);
    
    this.level.blocks.forEach(block => {
      if (block.animating || block.hit) {
        block.render(this.ctx, this.camera);
      }
    });
    
    this.level.coins.forEach(coin => {
      if (this.camera.isVisible(coin.x, coin.y, coin.width, coin.height)) {
        coin.render(this.ctx, this.camera);
      }
    });
    
    this.animatedCoins.forEach(coin => coin.render(this.ctx, this.camera));
    
    this.powerUps.forEach(powerUp => {
      if (powerUp.active) {
        powerUp.render(this.ctx, this.camera);
      }
    });
    
    this.level.enemies.forEach(enemy => {
      if (enemy.active && this.camera.isVisible(enemy.x, enemy.y, enemy.width, enemy.height)) {
        enemy.render(this.ctx, this.camera);
      }
    });
    
    this.fireballs.forEach(fireball => {
      if (fireball.active) {
        fireball.render(this.ctx, this.camera);
      }
    });
    
    this.player.render(this.ctx, this.camera);
  }
  
  notifyStateChange() {
    if (this.onStateChange) {
      this.onStateChange({
        state: this.gameState,
        score: this.score,
        coins: this.coins,
        lives: this.lives,
        time: this.time,
        playerState: this.player.state
      });
    }
  }
  
  getState() {
    return {
      state: this.gameState,
      score: this.score,
      coins: this.coins,
      lives: this.lives,
      time: this.time,
      playerState: this.player.state
    };
  }
  
  destroy() {
    this.input.destroy();
  }
}

export default GameEngine;
