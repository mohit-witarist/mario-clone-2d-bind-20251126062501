import { TILE_SIZE, GRAVITY, FIREBALL_SPEED, COLORS } from './constants';

class Fireball {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.width = 12;
    this.height = 12;
    this.velX = direction * FIREBALL_SPEED;
    this.velY = 0;
    this.active = true;
    this.bounceForce = -6;
    
    this.animFrame = 0;
    this.animTimer = 0;
  }
  
  update(collisionDetector, tiles, deltaTime) {
    if (!this.active) return;
    
    this.velY += GRAVITY * 0.5;
    
    const response = collisionDetector.resolveCollision(
      this, this.velX, this.velY, tiles
    );
    
    this.x = response.x;
    this.y = response.y;
    
    if (response.grounded) {
      this.velY = this.bounceForce;
    }
    
    if (response.hitWall) {
      this.active = false;
    }
    
    if (this.x < 0 || this.y > 600) {
      this.active = false;
    }
    
    this.animTimer += deltaTime;
    if (this.animTimer > 0.05) {
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
    ctx.arc(0, 0, this.width / 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
}

export default Fireball;
