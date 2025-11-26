import { TILE_SIZE, GRAVITY, MAX_FALL_SPEED, ENEMY_SPEED, COLORS } from './constants';

class Enemy {
  constructor(x, y, type = 'goomba') {
    this.x = x;
    this.y = y;
    this.width = TILE_SIZE - 4;
    this.height = TILE_SIZE - 4;
    this.velX = -ENEMY_SPEED;
    this.velY = 0;
    this.type = type;
    this.dead = false;
    this.squished = false;
    this.squishedTimer = 0;
    this.active = true;
    this.activated = false;
    
    this.animFrame = 0;
    this.animTimer = 0;
    this.facingRight = false;
  }
  
  activate() {
    this.activated = true;
  }
  
  update(collisionDetector, tiles, deltaTime, cameraX, cameraWidth) {
    if (!this.active) return;
    
    if (!this.activated) {
      if (this.x < cameraX + cameraWidth + 100) {
        this.activated = true;
      } else {
        return;
      }
    }
    
    if (this.squished) {
      this.squishedTimer += deltaTime;
      if (this.squishedTimer > 0.5) {
        this.active = false;
      }
      return;
    }
    
    if (this.dead) {
      this.velY += GRAVITY;
      this.y += this.velY;
      if (this.y > 1000) this.active = false;
      return;
    }
    
    this.velY += GRAVITY;
    if (this.velY > MAX_FALL_SPEED) this.velY = MAX_FALL_SPEED;
    
    const response = collisionDetector.resolveCollision(
      this, this.velX, this.velY, tiles
    );
    
    this.x = response.x;
    this.y = response.y;
    this.velY = response.velY;
    
    if (response.hitWall) {
      this.velX = -this.velX;
      this.facingRight = this.velX > 0;
    }
    
    if (response.grounded) {
      this.checkEdge(collisionDetector, tiles);
    }
    
    if (this.y > 600) {
      this.active = false;
    }
    
    this.animTimer += deltaTime;
    if (this.animTimer > 0.15) {
      this.animTimer = 0;
      this.animFrame = (this.animFrame + 1) % 2;
    }
  }
  
  checkEdge(collisionDetector, tiles) {
    const checkX = this.velX > 0 ? this.x + this.width + 2 : this.x - 2;
    const checkY = this.y + this.height + 4;
    
    const col = Math.floor(checkX / TILE_SIZE);
    const row = Math.floor(checkY / TILE_SIZE);
    
    if (row >= 0 && row < tiles.length && col >= 0 && col < tiles[0].length) {
      if (!collisionDetector.isSolid(tiles[row][col])) {
        this.velX = -this.velX;
        this.facingRight = this.velX > 0;
      }
    }
  }
  
  stomp() {
    this.squished = true;
    this.height = TILE_SIZE / 4;
    this.y += TILE_SIZE * 0.75 - 4;
  }
  
  kill() {
    this.dead = true;
    this.velY = -8;
  }
  
  render(ctx, camera) {
    if (!this.active) return;
    
    const screenPos = camera.worldToScreen(this.x, this.y);
    
    if (this.squished) {
      ctx.fillStyle = COLORS.GOOMBA;
      ctx.fillRect(screenPos.x, screenPos.y, this.width, this.height);
      
      ctx.fillStyle = '#000';
      ctx.fillRect(screenPos.x + 4, screenPos.y + 2, 4, 2);
      ctx.fillRect(screenPos.x + this.width - 8, screenPos.y + 2, 4, 2);
      return;
    }
    
    ctx.save();
    
    if (this.dead) {
      ctx.translate(screenPos.x + this.width / 2, screenPos.y + this.height / 2);
      ctx.scale(1, -1);
      ctx.translate(-(screenPos.x + this.width / 2), -(screenPos.y + this.height / 2));
    }
    
    if (this.facingRight) {
      ctx.translate(screenPos.x + this.width / 2, 0);
      ctx.scale(-1, 1);
      ctx.translate(-(screenPos.x + this.width / 2), 0);
    }
    
    ctx.fillStyle = COLORS.GOOMBA;
    ctx.beginPath();
    ctx.ellipse(
      screenPos.x + this.width / 2,
      screenPos.y + 10,
      this.width / 2 - 2,
      12,
      0, 0, Math.PI * 2
    );
    ctx.fill();
    
    ctx.fillStyle = '#000';
    ctx.fillRect(screenPos.x + 6, screenPos.y + 6, 5, 5);
    ctx.fillRect(screenPos.x + this.width - 11, screenPos.y + 6, 5, 5);
    
    ctx.fillStyle = '#fff';
    ctx.fillRect(screenPos.x + 7, screenPos.y + 7, 2, 2);
    ctx.fillRect(screenPos.x + this.width - 10, screenPos.y + 7, 2, 2);
    
    ctx.fillStyle = '#5c3317';
    const footOffset = this.animFrame === 0 ? 0 : 3;
    ctx.fillRect(screenPos.x + 2 - footOffset, screenPos.y + this.height - 8, 10, 8);
    ctx.fillRect(screenPos.x + this.width - 12 + footOffset, screenPos.y + this.height - 8, 10, 8);
    
    ctx.restore();
  }
}

export default Enemy;
