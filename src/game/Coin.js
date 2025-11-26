import { TILE_SIZE, COLORS } from './constants';

class Coin {
  constructor(x, y, fromBlock = false) {
    this.x = x;
    this.y = y;
    this.width = TILE_SIZE - 8;
    this.height = TILE_SIZE - 8;
    this.collected = false;
    this.active = true;
    
    this.fromBlock = fromBlock;
    this.velY = fromBlock ? -10 : 0;
    this.startY = y;
    
    this.animFrame = 0;
    this.animTimer = 0;
    this.spinFrames = [1, 0.7, 0.3, 0.7];
  }
  
  update(deltaTime) {
    if (!this.active) return;
    
    if (this.fromBlock) {
      this.velY += 0.5;
      this.y += this.velY;
      
      if (this.y >= this.startY) {
        this.active = false;
      }
    }
    
    this.animTimer += deltaTime;
    if (this.animTimer > 0.1) {
      this.animTimer = 0;
      this.animFrame = (this.animFrame + 1) % 4;
    }
  }
  
  collect() {
    this.collected = true;
    this.active = false;
  }
  
  render(ctx, camera) {
    if (!this.active) return;
    
    const screenPos = camera.worldToScreen(this.x, this.y);
    const scaleX = this.spinFrames[this.animFrame];
    
    ctx.save();
    ctx.translate(screenPos.x + this.width / 2, screenPos.y + this.height / 2);
    ctx.scale(scaleX, 1);
    
    ctx.fillStyle = COLORS.COIN;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.width / 2 - 2, this.height / 2 - 2, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#b8860b';
    ctx.beginPath();
    ctx.ellipse(0, 0, this.width / 2 - 6, this.height / 2 - 6, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = COLORS.COIN;
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$', 0, 0);
    
    ctx.restore();
  }
}

export default Coin;
