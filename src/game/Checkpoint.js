import { TILE_SIZE, COLORS } from './constants';

class Checkpoint {
  constructor(col, row) {
    this.col = col;
    this.row = row;
    this.x = col * TILE_SIZE;
    this.y = row * TILE_SIZE;
    this.width = TILE_SIZE;
    this.height = TILE_SIZE * 2;
    this.y = this.row * TILE_SIZE - TILE_SIZE;
    
    this.activated = false;
    this.animTimer = 0;
  }
  
  activate() {
    if (!this.activated) {
      this.activated = true;
      return true;
    }
    return false;
  }
  
  update(deltaTime) {
    this.animTimer += deltaTime;
  }
  
  render(ctx, camera) {
    const screenPos = camera.worldToScreen(this.x, this.y);
    
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(screenPos.x + 12, screenPos.y + 20, 8, this.height - 20);
    
    const flagColor = this.activated ? '#00ff00' : '#ff0000';
    const waveOffset = this.activated ? Math.sin(this.animTimer * 5) * 3 : 0;
    
    ctx.fillStyle = flagColor;
    ctx.beginPath();
    ctx.moveTo(screenPos.x + 20, screenPos.y);
    ctx.lineTo(screenPos.x + 20 + 20 + waveOffset, screenPos.y + 10);
    ctx.lineTo(screenPos.x + 20, screenPos.y + 20);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(screenPos.x + 16, screenPos.y - 4, 6, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default Checkpoint;
