import { 
  TILE_SIZE, GRAVITY, MAX_FALL_SPEED, PLAYER_SPEED, 
  PLAYER_JUMP_FORCE, PLAYER_ACCELERATION, PLAYER_FRICTION,
  PLAYER_STATES, COLORS 
} from './constants';

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = TILE_SIZE - 4;
    this.height = TILE_SIZE - 4;
    this.velX = 0;
    this.velY = 0;
    
    this.state = PLAYER_STATES.SMALL;
    this.grounded = false;
    this.facingRight = true;
    this.jumping = false;
    this.dead = false;
    this.invincible = false;
    this.invincibleTimer = 0;
    this.visible = true;
    this.blinkTimer = 0;
    
    this.animFrame = 0;
    this.animTimer = 0;
    
    this.deathAnimation = false;
    this.deathVelY = 0;
  }
  
  update(input, collisionDetector, tiles, deltaTime) {
    if (this.dead) {
      this.updateDeathAnimation();
      return;
    }
    
    if (this.invincible) {
      this.invincibleTimer -= deltaTime;
      this.blinkTimer += deltaTime;
      this.visible = Math.floor(this.blinkTimer * 10) % 2 === 0;
      
      if (this.invincibleTimer <= 0) {
        this.invincible = false;
        this.visible = true;
      }
    }
    
    if (input.keys.left) {
      this.velX -= PLAYER_ACCELERATION;
      this.facingRight = false;
    } else if (input.keys.right) {
      this.velX += PLAYER_ACCELERATION;
      this.facingRight = true;
    } else {
      this.velX *= PLAYER_FRICTION;
    }
    
    this.velX = Math.max(-PLAYER_SPEED, Math.min(PLAYER_SPEED, this.velX));
    
    if (Math.abs(this.velX) < 0.1) this.velX = 0;
    
    if (input.consumeJump() && this.grounded) {
      this.velY = PLAYER_JUMP_FORCE;
      this.grounded = false;
      this.jumping = true;
    }
    
    if (!input.keys.jump && this.velY < 0) {
      this.velY *= 0.5;
    }
    
    this.velY += GRAVITY;
    if (this.velY > MAX_FALL_SPEED) this.velY = MAX_FALL_SPEED;
    
    const response = collisionDetector.resolveCollision(
      this, this.velX, this.velY, tiles
    );
    
    this.x = response.x;
    this.y = response.y;
    this.velX = response.velX;
    this.velY = response.velY;
    this.grounded = response.grounded;
    
    if (this.grounded) {
      this.jumping = false;
    }
    
    if (Math.abs(this.velX) > 0.5) {
      this.animTimer += deltaTime;
      if (this.animTimer > 0.1) {
        this.animTimer = 0;
        this.animFrame = (this.animFrame + 1) % 3;
      }
    } else {
      this.animFrame = 0;
    }
    
    return response.hitBlock;
  }
  
  updateDeathAnimation() {
    if (this.deathAnimation) {
      this.deathVelY += GRAVITY * 0.5;
      this.y += this.deathVelY;
    }
  }
  
  die() {
    if (this.invincible) return false;
    
    if (this.state === PLAYER_STATES.SMALL) {
      this.dead = true;
      this.deathAnimation = true;
      this.deathVelY = -10;
      return true;
    } else {
      this.shrink();
      return false;
    }
  }
  
  shrink() {
    this.state = PLAYER_STATES.SMALL;
    this.height = TILE_SIZE - 4;
    this.invincible = true;
    this.invincibleTimer = 2;
    this.blinkTimer = 0;
  }
  
  grow() {
    if (this.state === PLAYER_STATES.SMALL) {
      this.state = PLAYER_STATES.BIG;
      this.height = TILE_SIZE * 2 - 8;
      this.y -= TILE_SIZE;
    }
  }
  
  getPowerUp(type) {
    if (type === 'mushroom') {
      this.grow();
    } else if (type === 'fire_flower') {
      if (this.state === PLAYER_STATES.SMALL) {
        this.grow();
      }
      this.state = PLAYER_STATES.FIRE;
    }
  }
  
  canShootFireball() {
    return this.state === PLAYER_STATES.FIRE;
  }
  
  render(ctx, camera) {
    if (!this.visible && !this.dead) return;
    
    const screenPos = camera.worldToScreen(this.x, this.y);
    
    ctx.save();
    
    if (this.dead) {
      this.renderDeathSprite(ctx, screenPos);
    } else {
      this.renderSprite(ctx, screenPos);
    }
    
    ctx.restore();
  }
  
  renderSprite(ctx, pos) {
    const centerX = pos.x + this.width / 2;
    
    ctx.save();
    ctx.translate(centerX, pos.y);
    
    if (!this.facingRight) {
      ctx.scale(-1, 1);
    }
    
    ctx.translate(-this.width / 2, 0);
    
    let bodyColor = COLORS.PLAYER_SMALL;
    if (this.state === PLAYER_STATES.FIRE) {
      bodyColor = '#fff';
    }
    
    const isBig = this.state !== PLAYER_STATES.SMALL;
    
    if (isBig) {
      ctx.fillStyle = bodyColor;
      ctx.fillRect(4, 0, this.width - 8, 12);
      
      ctx.fillStyle = '#ffcc99';
      ctx.fillRect(8, 2, 8, 8);
      
      ctx.fillStyle = '#8b4513';
      ctx.fillRect(6, 0, 12, 4);
      
      ctx.fillStyle = bodyColor;
      ctx.fillRect(2, 12, this.width - 4, 20);
      
      ctx.fillStyle = '#0000ff';
      ctx.fillRect(4, 32, 8, 12);
      ctx.fillRect(this.width - 12, 32, 8, 12);
      
      ctx.fillStyle = '#8b4513';
      ctx.fillRect(4, 44, 10, 6);
      ctx.fillRect(this.width - 14, 44, 10, 6);
    } else {
      ctx.fillStyle = bodyColor;
      ctx.fillRect(4, 0, this.width - 8, 10);
      
      ctx.fillStyle = '#ffcc99';
      ctx.fillRect(6, 2, 8, 6);
      
      ctx.fillStyle = '#8b4513';
      ctx.fillRect(4, 0, 12, 3);
      
      ctx.fillStyle = bodyColor;
      ctx.fillRect(2, 10, this.width - 4, 10);
      
      ctx.fillStyle = '#0000ff';
      ctx.fillRect(4, 20, 6, 6);
      ctx.fillRect(this.width - 10, 20, 6, 6);
      
      ctx.fillStyle = '#8b4513';
      ctx.fillRect(2, 24, 8, 4);
      ctx.fillRect(this.width - 10, 24, 8, 4);
    }
    
    ctx.restore();
  }
  
  renderDeathSprite(ctx, pos) {
    ctx.fillStyle = COLORS.PLAYER_SMALL;
    ctx.fillRect(pos.x + 4, pos.y, this.width - 8, this.height);
    
    ctx.fillStyle = '#ffcc99';
    ctx.fillRect(pos.x + 8, pos.y + 4, 12, 8);
    
    ctx.fillStyle = '#000';
    ctx.fillRect(pos.x + 10, pos.y + 6, 3, 3);
    ctx.fillRect(pos.x + 16, pos.y + 6, 3, 3);
  }
}

export default Player;
