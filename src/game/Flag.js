import { TILE_SIZE } from './constants';

class Flag {
  constructor(col, row) {
    this.col = col;
    this.row = row;
    this.x = col * TILE_SIZE;
    this.y = row * TILE_SIZE - TILE_SIZE * 8;
    this.width = TILE_SIZE;
    this.height = TILE_SIZE * 9;
    
    this.flagY = 0;
    this.reached = false;
    this.animating = false;
    this.animTimer = 0;
  }
  
  reach() {
    if (!this.reached) {
      this.reached = true;
      this.animating = true;
      return true;
    }
    return false;
  }
  
  update(deltaTime) {
    this.animTimer += deltaTime;
    
    if (this.animating) {
      this.flagY += 100 * deltaTime;
      if (this.flagY >= this.height - TILE_SIZE * 2) {
        this.flagY = this.height - TILE_SIZE * 2;
        this.animating = false;
      }
    }
  }
  
  render(ctx, camera) {
    const screenPos = camera.worldToScreen(this.x, this.y);
    
    ctx.fillStyle = '#00a800';
    ctx.fillRect(screenPos.x + 14, screenPos.y, 4, this.height);
    
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(screenPos.x + 16, screenPos.y - 6, 8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(screenPos.x + 18, screenPos.y + 4 + this.flagY);
    ctx.lineTo(screenPos.x + 18 + 24, screenPos.y + 16 + this.flagY);
    ctx.lineTo(screenPos.x + 18, screenPos.y + 28 + this.flagY);
    ctx.closePath();
    ctx.fill();
    
    ctx.strokeStyle = '#e52521';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(screenPos.x, screenPos.y + this.height - TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}

export default Flag;
