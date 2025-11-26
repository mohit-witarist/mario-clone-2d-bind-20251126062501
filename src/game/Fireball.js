import { TILE_SIZE, GRAVITY, FIREBALL_SPEED, COLORS } from './constants';

class Fireball {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.velX = direction * FIREBALL_SPEED;
    this.velY = 2;
    this.direction = direction;
    this.active = true;
    this.bounceForce = -7;
    this.bounceCount = 0;
    this.maxBounces = 4;
    
    this.animFrame = 0;
    this.animTimer = 0;
  }
  
  update(collisionDetector, tiles, deltaTime) {
    if (!this.active) return;
    
    this.velY += GRAVITY * 0.6;
    
    const tempEntity = { x: this.x, y: this.y, width: this.width, height: this.height };
    
    tempEntity.x += this.velX;
    const hCollisions = collisionDetector.checkEntityCollision(tempEntity, tiles);
    
    if (hCollisions.tiles.length > 0) {
      this.active = false;
      return;
    }
    
    this.x = tempEntity.x;
    
    tempEntity.y += this.velY;
    const vCollisions = collisionDetector.checkEntityCollision(tempEntity, tiles);
    
    if (vCollisions.tiles.length > 0) {
      if (this.velY > 0) {
        const tile = vCollisions.tiles[0];
        this.y = tile.row * TILE_SIZE - this.height;
        this.velY = this.bounceForce;
        this.bounceCount++;
        
        if (this.bounceCount >= this.maxBounces) {
          this.active = false;
        }
      } else {
        this.active = false;
      }
    } else {
      this.y = tempEntity.y;
    }
    
    if (this.x < -50 || this.x > 10000 || this.y > 600) {
      this.active = false;
    }
    
    this.animTimer += deltaTime;
    if (this.animTimer > 0.04) {
      this.animTimer = 0;
      this.animFrame = (this.animFrame + 1) % 4;
    }
  }
  
  render(ctx, camera) {
    if (!this.active) return;
    
    const screenPos = camera.worldToScreen(this.x, this.y);
    const rotation = this.animFrame * Math.PI / 2;
    
    ctx.save();
    ctx.translate(screenPos.x + this.width / 2, screenPos.y + this.height / 2);
    ctx.rotate(rotation);
    
    ctx.fillStyle = COLORS.FIREBALL;
    ctx.beginPath();
    ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(0, 0, this.width / 3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(-1, -1, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
}

export default Fireball;
