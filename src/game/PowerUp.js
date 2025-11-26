import { TILE_SIZE, GRAVITY, COLORS } from './constants';

class PowerUp {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = TILE_SIZE - 4;
    this.height = TILE_SIZE - 4;
    this.type = type;
    this.velX = type === 'mushroom' ? 2 : 0;
    this.velY = 0;
    this.active = true;
    this.emerging = true;
    this.emergeY = y;
    this.startY = y + TILE_SIZE;
    this.y = this.startY;
    this.emergeSpeed = 0.8;
    
    this.animTimer = 0;
  }
  
  update(collisionDetector, tiles, deltaTime) {
    if (!this.active) return;
    
    if (this.emerging) {
      this.y -= this.emergeSpeed;
      if (this.y <= this.emergeY) {
        this.y = this.emergeY;
        this.emerging = false;
      }
      return;
    }
    
    if (this.type === 'mushroom') {
      this.velY += GRAVITY;
      
      const response = collisionDetector.resolveCollision(
        this, this.velX, this.velY, tiles
      );
      
      this.x = response.x;
      this.y = response.y;
      this.velY = response.velY;
      
      if (response.hitWall) {
        this.velX = -this.velX;
      }
      
      if (this.y > 600) {
        this.active = false;
      }
    } else {
      this.animTimer += deltaTime;
    }
  }
  
  collect() {
    this.active = false;
  }
  
  render(ctx, camera) {
    if (!this.active) return;
    
    const screenPos = camera.worldToScreen(this.x, this.y);
    
    if (this.type === 'mushroom') {
      ctx.fillStyle = COLORS.MUSHROOM;
      ctx.beginPath();
      ctx.ellipse(
        screenPos.x + this.width / 2,
        screenPos.y + 10,
        this.width / 2,
        12,
        0, Math.PI, 0
      );
      ctx.fill();
      
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(screenPos.x + 8, screenPos.y + 6, 5, 0, Math.PI * 2);
      ctx.arc(screenPos.x + this.width - 8, screenPos.y + 6, 5, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#f5deb3';
      ctx.fillRect(screenPos.x + 6, screenPos.y + 14, this.width - 12, 12);
      
      ctx.fillStyle = '#000';
      ctx.fillRect(screenPos.x + 10, screenPos.y + 18, 3, 3);
      ctx.fillRect(screenPos.x + this.width - 13, screenPos.y + 18, 3, 3);
    } else if (this.type === 'fire_flower') {
      const bounce = Math.sin(this.animTimer * 5) * 2;
      
      ctx.fillStyle = '#00a800';
      ctx.fillRect(screenPos.x + 12, screenPos.y + 16 + bounce, 4, 12);
      
      ctx.fillStyle = COLORS.FIRE_FLOWER;
      ctx.beginPath();
      ctx.arc(screenPos.x + this.width / 2, screenPos.y + 12 + bounce, 10, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(screenPos.x + this.width / 2, screenPos.y + 12 + bounce, 5, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#fff';
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + this.animTimer * 2;
        const px = screenPos.x + this.width / 2 + Math.cos(angle) * 8;
        const py = screenPos.y + 12 + bounce + Math.sin(angle) * 8;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

export default PowerUp;
