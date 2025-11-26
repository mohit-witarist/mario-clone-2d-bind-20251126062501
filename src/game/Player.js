import { 
  TILE_SIZE, GRAVITY, MAX_FALL_SPEED, PLAYER_SPEED, PLAYER_RUN_SPEED,
  PLAYER_JUMP_FORCE, PLAYER_JUMP_FORCE_MIN, PLAYER_ACCELERATION, 
  PLAYER_RUN_ACCELERATION, PLAYER_FRICTION, PLAYER_AIR_FRICTION,
  PLAYER_STATES, COLORS 
} from './constants';

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = TILE_SIZE - 8;
    this.height = TILE_SIZE - 4;
    this.velX = 0;
    this.velY = 0;
    
    this.state = PLAYER_STATES.SMALL;
    this.grounded = false;
    this.wasGrounded = false;
    this.facingRight = true;
    this.jumping = false;
    this.jumpHeld = false;
    this.jumpTime = 0;
    this.maxJumpTime = 0.25;
    this.coyoteTime = 0;
    this.maxCoyoteTime = 0.1;
    this.jumpBufferTime = 0;
    this.maxJumpBufferTime = 0.1;
    
    this.dead = false;
    this.invincible = false;
    this.invincibleTimer = 0;
    this.visible = true;
    this.blinkTimer = 0;
    
    this.growing = false;
    this.growTimer = 0;
    this.growPhase = 0;
    
    this.animFrame = 0;
    this.animTimer = 0;
    
    this.deathAnimation = false;
    this.deathVelY = 0;
    this.deathPauseTimer = 0;
  }
  
  update(input, collisionDetector, tiles, deltaTime) {
    if (this.dead) {
      this.updateDeathAnimation(deltaTime);
      return null;
    }
    
    if (this.growing) {
      this.updateGrowAnimation(deltaTime);
      return null;
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
    
    if (this.coyoteTime > 0) {
      this.coyoteTime -= deltaTime;
    }
    
    if (this.jumpBufferTime > 0) {
      this.jumpBufferTime -= deltaTime;
    }
    
    const isRunning = input.isRunning();
    const maxSpeed = isRunning ? PLAYER_RUN_SPEED : PLAYER_SPEED;
    const accel = isRunning ? PLAYER_RUN_ACCELERATION : PLAYER_ACCELERATION;
    
    if (input.keys.left) {
      this.velX -= accel;
      this.facingRight = false;
    } else if (input.keys.right) {
      this.velX += accel;
      this.facingRight = true;
    } else {
      const friction = this.grounded ? PLAYER_FRICTION : PLAYER_AIR_FRICTION;
      this.velX *= friction;
    }
    
    this.velX = Math.max(-maxSpeed, Math.min(maxSpeed, this.velX));
    
    if (Math.abs(this.velX) < 0.1) this.velX = 0;
    
    if (input.consumeJump()) {
      this.jumpBufferTime = this.maxJumpBufferTime;
    }
    
    const canJump = this.grounded || this.coyoteTime > 0;
    const wantsToJump = this.jumpBufferTime > 0;
    
    if (wantsToJump && canJump && !this.jumping) {
      this.velY = PLAYER_JUMP_FORCE;
      this.grounded = false;
      this.jumping = true;
      this.jumpHeld = true;
      this.jumpTime = 0;
      this.coyoteTime = 0;
      this.jumpBufferTime = 0;
    }
    
    if (this.jumping && this.jumpHeld) {
      this.jumpTime += deltaTime;
      
      if (!input.isJumpHeld() || this.jumpTime >= this.maxJumpTime) {
        this.jumpHeld = false;
        if (this.velY < PLAYER_JUMP_FORCE_MIN) {
          this.velY = PLAYER_JUMP_FORCE_MIN;
        }
      }
    }
    
    this.velY += GRAVITY;
    if (this.velY > MAX_FALL_SPEED) this.velY = MAX_FALL_SPEED;
    
    this.wasGrounded = this.grounded;
    
    const response = collisionDetector.resolveCollision(
      this, this.velX, this.velY, tiles
    );
    
    this.x = response.x;
    this.y = response.y;
    if (response.hitWall) {
      this.velX = 0;
    }
    this.velY = response.velY;
    
    this.grounded = response.grounded;
    
    if (this.grounded) {
      this.jumping = false;
      this.jumpHeld = false;
      this.coyoteTime = this.maxCoyoteTime;
    } else if (this.wasGrounded && !this.jumping) {
      this.coyoteTime = this.maxCoyoteTime;
    }
    
    if (this.grounded && Math.abs(this.velX) > 0.5) {
      this.animTimer += deltaTime;
      if (this.animTimer > 0.08) {
        this.animTimer = 0;
        this.animFrame = (this.animFrame + 1) % 3;
      }
    } else if (!this.grounded) {
      this.animFrame = 1;
    } else {
      this.animFrame = 0;
    }
    
    return response.hitBlock;
  }
  
  updateDeathAnimation(deltaTime) {
    if (this.deathPauseTimer > 0) {
      this.deathPauseTimer -= deltaTime;
      return;
    }
    
    if (this.deathAnimation) {
      this.deathVelY += GRAVITY * 0.5;
      this.y += this.deathVelY;
    }
  }
  
  updateGrowAnimation(deltaTime) {
    this.growTimer += deltaTime;
    
    if (this.growTimer > 0.1) {
      this.growTimer = 0;
      this.growPhase++;
      
      if (this.growPhase >= 6) {
        this.growing = false;
        this.growPhase = 0;
      }
    }
  }
  
  die() {
    if (this.invincible || this.dead) return false;
    
    if (this.state === PLAYER_STATES.SMALL) {
      this.dead = true;
      this.deathAnimation = true;
      this.deathVelY = -10;
      this.deathPauseTimer = 0.5;
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
      this.growing = true;
      this.growTimer = 0;
      this.growPhase = 0;
    }
  }
  
  getPowerUp(type) {
    if (type === 'mushroom') {
      if (this.state === PLAYER_STATES.SMALL) {
        this.grow();
      }
    } else if (type === 'fire_flower') {
      if (this.state === PLAYER_STATES.SMALL) {
        this.grow();
      }
      this.state = PLAYER_STATES.FIRE;
    }
  }
  
  canShootFireball() {
    return this.state === PLAYER_STATES.FIRE && !this.dead && !this.growing;
  }
  
  bounce() {
    this.velY = -8;
    this.jumping = false;
  }
  
  render(ctx, camera) {
    if (!this.visible && !this.dead) return;
    
    const screenPos = camera.worldToScreen(this.x, this.y);
    
    ctx.save();
    
    if (this.dead) {
      this.renderDeathSprite(ctx, screenPos);
    } else if (this.growing) {
      this.renderGrowingSprite(ctx, screenPos);
    } else {
      this.renderSprite(ctx, screenPos);
    }
    
    ctx.restore();
  }
  
  renderGrowingSprite(ctx, pos) {
    const isSmallFrame = this.growPhase % 2 === 0;
    const tempHeight = isSmallFrame ? TILE_SIZE - 4 : TILE_SIZE * 2 - 8;
    const offsetY = isSmallFrame ? TILE_SIZE : 0;
    
    ctx.fillStyle = COLORS.PLAYER_SMALL;
    ctx.fillRect(pos.x + 4, pos.y + offsetY, this.width - 8, tempHeight - 4);
    
    ctx.fillStyle = '#ffcc99';
    ctx.fillRect(pos.x + 8, pos.y + offsetY + 2, 8, 8);
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
    let pantsColor = '#0000ff';
    
    if (this.state === PLAYER_STATES.FIRE) {
      bodyColor = '#fff';
      pantsColor = '#ff0000';
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
      
      const legOffset = this.animFrame === 1 ? 2 : (this.animFrame === 2 ? -2 : 0);
      
      ctx.fillStyle = pantsColor;
      ctx.fillRect(4 + legOffset, 32, 8, 12);
      ctx.fillRect(this.width - 12 - legOffset, 32, 8, 12);
      
      ctx.fillStyle = '#8b4513';
      ctx.fillRect(4 + legOffset, 44, 10, 6);
      ctx.fillRect(this.width - 14 - legOffset, 44, 10, 6);
    } else {
      ctx.fillStyle = bodyColor;
      ctx.fillRect(4, 0, this.width - 8, 10);
      
      ctx.fillStyle = '#ffcc99';
      ctx.fillRect(6, 2, 8, 6);
      
      ctx.fillStyle = '#8b4513';
      ctx.fillRect(4, 0, 12, 3);
      
      ctx.fillStyle = bodyColor;
      ctx.fillRect(2, 10, this.width - 4, 10);
      
      const legOffset = this.animFrame === 1 ? 2 : (this.animFrame === 2 ? -2 : 0);
      
      ctx.fillStyle = pantsColor;
      ctx.fillRect(4 + legOffset, 20, 6, 6);
      ctx.fillRect(this.width - 10 - legOffset, 20, 6, 6);
      
      ctx.fillStyle = '#8b4513';
      ctx.fillRect(2 + legOffset, 24, 8, 4);
      ctx.fillRect(this.width - 10 - legOffset, 24, 8, 4);
    }
    
    ctx.restore();
  }
  
  renderDeathSprite(ctx, pos) {
    ctx.fillStyle = COLORS.PLAYER_SMALL;
    ctx.fillRect(pos.x + 4, pos.y, this.width - 8, TILE_SIZE - 4);
    
    ctx.fillStyle = '#ffcc99';
    ctx.fillRect(pos.x + 8, pos.y + 4, 12, 8);
    
    ctx.fillStyle = '#000';
    ctx.fillRect(pos.x + 10, pos.y + 6, 3, 2);
    ctx.fillRect(pos.x + 16, pos.y + 6, 3, 2);
    
    ctx.fillStyle = '#000';
    ctx.fillRect(pos.x + 12, pos.y + 10, 6, 2);
  }
}

export default Player;
