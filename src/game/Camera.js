import { CANVAS_WIDTH, CANVAS_HEIGHT, TILE_SIZE } from './constants';

class Camera {
  constructor(levelWidth, levelHeight) {
    this.x = 0;
    this.y = 0;
    this.width = CANVAS_WIDTH;
    this.height = CANVAS_HEIGHT;
    this.levelWidth = levelWidth;
    this.levelHeight = levelHeight;
    this.targetX = 0;
    this.smoothing = 0.08;
    this.leadAmount = 50;
  }
  
  follow(target) {
    const targetScreenX = this.width / 3;
    this.targetX = target.x - targetScreenX;
    
    if (target.velX > 0) {
      this.targetX += this.leadAmount;
    }
    
    const dx = this.targetX - this.x;
    this.x += dx * this.smoothing;
    
    if (this.x < 0) this.x = 0;
    if (this.x > this.levelWidth - this.width) {
      this.x = Math.max(0, this.levelWidth - this.width);
    }
    
    this.y = 0;
  }
  
  setLevelWidth(width) {
    this.levelWidth = width;
  }
  
  isVisible(x, y, width, height) {
    return (
      x + width > this.x - 50 &&
      x < this.x + this.width + 50 &&
      y + height > this.y &&
      y < this.y + this.height
    );
  }
  
  worldToScreen(x, y) {
    return {
      x: x - this.x,
      y: y - this.y
    };
  }
}

export default Camera;
