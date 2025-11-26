import { TILE_SIZE, BLOCK_TYPES, COLORS } from './constants';

class Block {
  constructor(row, col, type) {
    this.row = row;
    this.col = col;
    this.x = col * TILE_SIZE;
    this.y = row * TILE_SIZE;
    this.type = type;
    this.width = TILE_SIZE;
    this.height = TILE_SIZE;
    this.hit = false;
    this.animating = false;
    this.animY = 0;
    this.animVelocity = 0;
    this.content = null;
    
    this.setContent();
  }
  
  setContent() {
    switch(this.type) {
      case BLOCK_TYPES.QUESTION_COIN:
        this.content = 'coin';
        break;
      case BLOCK_TYPES.QUESTION_MUSHROOM:
        this.content = 'mushroom';
        break;
      case BLOCK_TYPES.QUESTION_FIRE:
        this.content = 'fire_flower';
        break;
    }
  }
  
  hitBlock(tiles) {
    if (this.hit) return null;
    
    this.hit = true;
    this.animating = true;
    this.animVelocity = -6;
    
    tiles[this.row][this.col] = BLOCK_TYPES.QUESTION_EMPTY;
    this.type = BLOCK_TYPES.QUESTION_EMPTY;
    
    return this.content;
  }
  
  update(deltaTime) {
    if (this.animating) {
      this.animVelocity += 0.5;
      this.animY += this.animVelocity;
      
      if (this.animY >= 0) {
        this.animY = 0;
        this.animVelocity = 0;
        this.animating = false;
      }
    }
  }
  
  render(ctx, camera) {
    const screenPos = camera.worldToScreen(this.x, this.y + this.animY);
    
    this.renderBlock(ctx, screenPos.x, screenPos.y, this.type);
  }
  
  renderBlock(ctx, x, y, type) {
    switch(type) {
      case BLOCK_TYPES.GROUND:
      case BLOCK_TYPES.HARD_BLOCK:
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = '#654321';
        ctx.fillRect(x, y, TILE_SIZE, 2);
        ctx.fillRect(x, y + TILE_SIZE / 2, TILE_SIZE, 2);
        ctx.fillRect(x + TILE_SIZE / 4, y, 2, TILE_SIZE / 2);
        ctx.fillRect(x + TILE_SIZE * 3 / 4, y + TILE_SIZE / 2, 2, TILE_SIZE / 2);
        break;
        
      case BLOCK_TYPES.BRICK:
        ctx.fillStyle = COLORS.BRICK;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = '#8b2500';
        ctx.strokeStyle = '#5c1a00';
        ctx.lineWidth = 1;
        for (let i = 0; i < 4; i++) {
          ctx.strokeRect(x + 1, y + i * 8 + 1, TILE_SIZE - 2, 7);
        }
        break;
        
      case BLOCK_TYPES.QUESTION_COIN:
      case BLOCK_TYPES.QUESTION_MUSHROOM:
      case BLOCK_TYPES.QUESTION_FIRE:
        ctx.fillStyle = COLORS.QUESTION_BLOCK;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = '#b8860b';
        ctx.fillRect(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4);
        ctx.fillStyle = COLORS.QUESTION_BLOCK;
        ctx.fillRect(x + 4, y + 4, TILE_SIZE - 8, TILE_SIZE - 8);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('?', x + TILE_SIZE / 2, y + TILE_SIZE / 2 + 6);
        break;
        
      case BLOCK_TYPES.QUESTION_EMPTY:
        ctx.fillStyle = COLORS.QUESTION_BLOCK_EMPTY;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = '#5c3317';
        ctx.fillRect(x + 4, y + 4, TILE_SIZE - 8, TILE_SIZE - 8);
        break;
        
      case BLOCK_TYPES.PIPE_TOP_LEFT:
        ctx.fillStyle = COLORS.PIPE;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = '#008000';
        ctx.fillRect(x, y, 4, TILE_SIZE);
        ctx.fillStyle = '#00c800';
        ctx.fillRect(x + TILE_SIZE - 8, y, 8, TILE_SIZE);
        ctx.fillStyle = '#005000';
        ctx.fillRect(x, y, TILE_SIZE, 4);
        break;
        
      case BLOCK_TYPES.PIPE_TOP_RIGHT:
        ctx.fillStyle = COLORS.PIPE;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = '#00c800';
        ctx.fillRect(x, y, 8, TILE_SIZE);
        ctx.fillStyle = '#008000';
        ctx.fillRect(x + TILE_SIZE - 4, y, 4, TILE_SIZE);
        ctx.fillStyle = '#005000';
        ctx.fillRect(x, y, TILE_SIZE, 4);
        break;
        
      case BLOCK_TYPES.PIPE_BODY_LEFT:
        ctx.fillStyle = COLORS.PIPE;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = '#008000';
        ctx.fillRect(x + 4, y, 4, TILE_SIZE);
        ctx.fillStyle = '#00c800';
        ctx.fillRect(x + TILE_SIZE - 4, y, 4, TILE_SIZE);
        break;
        
      case BLOCK_TYPES.PIPE_BODY_RIGHT:
        ctx.fillStyle = COLORS.PIPE;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = '#00c800';
        ctx.fillRect(x, y, 4, TILE_SIZE);
        ctx.fillStyle = '#008000';
        ctx.fillRect(x + TILE_SIZE - 8, y, 4, TILE_SIZE);
        break;
    }
  }
}

export default Block;
