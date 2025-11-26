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
    this.smoothing = 0.1;
  }
  
  follow(target) {
    this.targetX = target.x - this.width / 3;
    
    this.x += (this.targetX - this.x) * this.smoothing;
    
    if (this.x < 0) this.x = 0;
    if (this.x > this.levelWidth - this.width) {
      this.x = this.levelWidth - this.width;
    }
    
    this.y = 0;
  }
  
  isVisible(x, y, width, height) {
    return (
      x + width > this.x &&
      x < this.x + this.width &&
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
