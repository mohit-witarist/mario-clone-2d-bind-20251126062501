import { 
  CANVAS_WIDTH, CANVAS_HEIGHT, TILE_SIZE,
  GAME_STATES, BLOCK_TYPES, FIREBALL_COOLDOWN, PLAYER_STATES
} from './constants';
import Player from './Player';
import Level from './Level';
import Camera from './Camera';
import CollisionDetector from './CollisionDetector';
import InputHandler from './InputHandler';
import SpriteRenderer from './SpriteRenderer';
import LevelManager from './LevelManager';
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
    this.time = 300;
    
    this.levelManager = new LevelManager();
    this.level = null;
    this.player = null;
    this.camera = null;
    this.collisionDetector = null;
    this.input = new InputHandler();
    this.spriteRenderer = new SpriteRenderer(this.ctx);
    
    this.powerUps = [];
    this.fireballs = [];
    this.animatedCoins = [];
    
    this.lastTime = 0;
    this.timeAccumulator = 0;
    this.lastFireballTime = 0;
    
    this.deathFadeAlpha = 0;
    this.deathFadeTimer = 0;
    this.deathFadeDuration = 1.5;
    
    this.onStateChange = null;
    
    this.initLevel();
  }
  
  initLevel() {
    const levelConfig = this.levelManager.getCurrentLevel();
    this.level = new Level(levelConfig);
    
    const startPos = this.levelManager.getPlayerStart();
    this.player = new Player(startPos.x, startPos.y);
    
    this.camera = new Camera(this.level.width, this.level.height);
    this.collisionDetector = new CollisionDetector(this.level);
    
    this.time = this.levelManager.getTimeLimit();
    this.powerUps = [];
    this.fireballs = [];
    this.animatedCoins = [];
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
    this.levelManager.resetGame();
    this.initLevel();
    this.camera.x = 0;
    this.deathFadeAlpha = 0;
    this.deathFadeTimer = 0;
    this.gameState = GAME_STATES.PLAYING;
    this.notifyStateChange();
  }
  
  respawn() {
    this.deathFadeAlpha = 0;
    this.deathFadeTimer = 0;
    
    if (this.levelManager.hasCheckpoint()) {
      const checkpointPos = this.levelManager.getCheckpointPosition();
      const savedState = this.levelManager.getSavedState();
      
      this.player = new Player(checkpointPos.x, checkpointPos.y - TILE_SIZE);
      
      if (savedState) {
        if (savedState.playerState === PLAYER_STATES.BIG) {
          this.player.state = PLAYER_STATES.BIG;
          this.player.height = TILE_SIZE * 2 - 8;
        } else if (savedState.playerState === PLAYER_STATES.FIRE) {
          this.player.state = PLAYER_STATES.FIRE;
          this.player.height = TILE_SIZE * 2 - 8;
        }
      }
      
      this.camera.x = Math.max(0, checkpointPos.x - CANVAS_WIDTH / 3);
    } else {
      const startPos = this.levelManager.getPlayerStart();
      this.player = new Player(startPos.x, startPos.y);
      this.camera.x = 0;
    }
    
    this.time = this.levelManager.getTimeLimit();
    this.powerUps = [];
    this.fireballs = [];
    
    this.gameState = GAME_STATES.PLAYING;
    this.notifyStateChange();
  }
  
  update(currentTime) {
    const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;
    
    if (this.levelManager.isTransitioning()) {
      this.levelManager.updateTransition(deltaTime);
      return;
    }
    
    if (this.gameState === GAME_STATES.DYING) {
      this.updateDeathSequence(deltaTime);
      return;
    }
    
    if (this.gameState === GAME_STATES.LEVEL_COMPLETE) {
      return;
    }
    
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
    
    const now = performance.now();
    if (this.input.consumeFire() && this.player.canShootFireball()) {
      if (now - this.lastFireballTime >= FIREBALL_COOLDOWN) {
        this.shootFireball();
        this.lastFireballTime = now;
      }
    }
    
    this.level.blocks.forEach(block => block.update(deltaTime));
    
    this.level.enemies.forEach(enemy => {
      enemy.update(this.collisionDetector, this.level.tiles, deltaTime, this.camera.x, this.camera.width);
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
    
    this.level.checkpoints.forEach(cp => cp.update(deltaTime));
    
    if (this.level.flag) {
      this.level.flag.update(deltaTime);
    }
    
    this.checkCollisions();
    
    this.camera.follow(this.player);
    
    if (this.player.y > CANVAS_HEIGHT + 100) {
      this.playerDeath();
    }
  }
  
  updateDeathSequence(deltaTime) {
    this.player.update(this.input, this.collisionDetector, this.level.tiles, deltaTime);
    
    this.deathFadeTimer += deltaTime;
    
    const fadeStartTime = 0.8;
    const fadeDuration = 0.7;
    
    if (this.deathFadeTimer > fadeStartTime) {
      const fadeProgress = (this.deathFadeTimer - fadeStartTime) / fadeDuration;
      this.deathFadeAlpha = Math.min(1, fadeProgress);
    }
    
    if (this.deathFadeTimer >= this.deathFadeDuration) {
      if (this.lives <= 0) {
        this.gameState = GAME_STATES.GAME_OVER;
      } else {
        this.gameState = GAME_STATES.DEAD;
      }
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
    
    this.level.checkpoints.forEach(checkpoint => {
      if (!checkpoint.activated) {
        const cpBounds = {
          x: checkpoint.x,
          y: checkpoint.y,
          width: checkpoint.width,
          height: checkpoint.height
        };
        
        if (this.collisionDetector.checkEntityVsEntity(this.player, cpBounds)) {
          checkpoint.activate();
          this.levelManager.saveCheckpoint(
            checkpoint.x,
            checkpoint.y + TILE_SIZE,
            this.player.state,
            this.score,
            this.coins
          );
        }
      }
    });
    
    if (this.level.flag && !this.level.flag.reached) {
      const flagBounds = {
        x: this.level.flag.x,
        y: this.level.flag.y,
        width: this.level.flag.width,
        height: this.level.flag.height
      };
      
      if (this.collisionDetector.checkEntityVsEntity(this.player, flagBounds)) {
        this.reachFlag();
      }
    }
    
    this.level.enemies.forEach(enemy => {
      if (!enemy.active || enemy.squished || enemy.dead) return;
      
      if (this.collisionDetector.checkEntityVsEntity(this.player, enemy)) {
        const direction = this.collisionDetector.getOverlapDirection(
          this.player, 
          enemy, 
          this.player.velY
        );
        
        if (direction === 'stomp') {
          enemy.stomp();
          this.player.bounce();
          this.score += 100;
        } else if (!this.player.invincible) {
          this.playerDeath();
        }
      }
    });
    
    this.fireballs = this.fireballs.filter(fireball => {
      if (!fireball.active) return false;
      
      let hitEnemy = false;
      this.level.enemies.forEach(enemy => {
        if (!enemy.active || enemy.squished || enemy.dead) return;
        
        if (this.collisionDetector.checkEntityVsEntity(fireball, enemy)) {
          enemy.kill();
          hitEnemy = true;
          this.score += 200;
        }
      });
      
      if (hitEnemy) {
        fireball.active = false;
        return false;
      }
      
      return fireball.active;
    });
  }
  
  reachFlag() {
    this.level.flag.reach();
    this.score += 1000;
    
    this.gameState = GAME_STATES.LEVEL_COMPLETE;
    
    setTimeout(() => {
      if (this.levelManager.canAdvance()) {
        this.levelManager.startTransition(() => {
          this.levelManager.advanceLevel();
          this.initLevel();
          this.gameState = GAME_STATES.PLAYING;
          this.notifyStateChange();
        });
      } else {
        this.gameState = GAME_STATES.WIN;
        this.notifyStateChange();
      }
    }, 1500);
  }
  
  playerDeath() {
    const died = this.player.die();
    
    if (died) {
      this.lives--;
      this.gameState = GAME_STATES.DYING;
      this.deathFadeAlpha = 0;
      this.deathFadeTimer = 0;
      this.notifyStateChange();
    }
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
    
    this.level.checkpoints.forEach(checkpoint => {
      if (this.camera.isVisible(checkpoint.x, checkpoint.y, checkpoint.width, checkpoint.height)) {
        checkpoint.render(this.ctx, this.camera);
      }
    });
    
    if (this.level.flag) {
      if (this.camera.isVisible(this.level.flag.x, this.level.flag.y, this.level.flag.width, this.level.flag.height)) {
        this.level.flag.render(this.ctx, this.camera);
      }
    }
    
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
    
    if (this.gameState === GAME_STATES.DYING && this.deathFadeAlpha > 0) {
      this.ctx.fillStyle = `rgba(0, 0, 0, ${this.deathFadeAlpha})`;
      this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
    
    this.levelManager.renderTransition(this.ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
  
  notifyStateChange() {
    if (this.onStateChange) {
      this.onStateChange({
        state: this.gameState,
        score: this.score,
        coins: this.coins,
        lives: this.lives,
        time: this.time,
        playerState: this.player.state,
        levelNumber: this.levelManager.getCurrentLevelNumber(),
        levelName: this.levelManager.getLevelName(),
        totalLevels: this.levelManager.getTotalLevels()
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
      playerState: this.player.state,
      levelNumber: this.levelManager.getCurrentLevelNumber(),
      levelName: this.levelManager.getLevelName(),
      totalLevels: this.levelManager.getTotalLevels()
    };
  }
  
  destroy() {
    this.input.destroy();
  }
}

export default GameEngine;
