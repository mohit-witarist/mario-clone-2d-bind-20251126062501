import { TILE_SIZE, BLOCK_TYPES, COLORS, CANVAS_HEIGHT } from './constants';

class SpriteRenderer {
  constructor(ctx) {
    this.ctx = ctx;
  }
  
  renderBackground(camera, levelWidth) {
    const ctx = this.ctx;
    
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#5c94fc');
    gradient.addColorStop(0.7, '#5c94fc');
    gradient.addColorStop(0.7, '#8b4513');
    gradient.addColorStop(1, '#654321');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    ctx.fillStyle = '#fff';
    const cloudPositions = [100, 300, 550, 800, 1100, 1500, 2000, 2500, 2800];
    cloudPositions.forEach((baseX, i) => {
      const x = (baseX - camera.x * 0.3) % (levelWidth + 400) - 100;
      const y = 50 + (i % 3) * 30;
      this.drawCloud(ctx, x, y);
    });
    
    ctx.fillStyle = '#228b22';
    const bushPositions = [50, 200, 400, 700, 1000, 1400, 1800, 2200, 2600];
    bushPositions.forEach((baseX, i) => {
      const x = baseX - camera.x;
      const y = CANVAS_HEIGHT - 64 - 20;
      if (x > -100 && x < ctx.canvas.width + 100) {
        this.drawBush(ctx, x, y, (i % 3) + 1);
      }
    });
    
    ctx.fillStyle = '#2e8b2e';
    const hillPositions = [0, 500, 1200, 2000, 2800];
    hillPositions.forEach((baseX, i) => {
      const x = (baseX - camera.x * 0.5);
      const y = CANVAS_HEIGHT - 64;
      if (x > -200 && x < ctx.canvas.width + 200) {
        this.drawHill(ctx, x, y, 80 + (i % 2) * 40);
      }
    });
  }
  
  drawCloud(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.arc(x + 25, y - 10, 25, 0, Math.PI * 2);
    ctx.arc(x + 50, y, 20, 0, Math.PI * 2);
    ctx.arc(x + 25, y + 5, 18, 0, Math.PI * 2);
    ctx.fill();
  }
  
  drawBush(ctx, x, y, size) {
    const baseWidth = 30 * size;
    ctx.beginPath();
    for (let i = 0; i < size; i++) {
      ctx.arc(x + i * 25, y, 20, 0, Math.PI * 2);
    }
    ctx.fill();
  }
  
  drawHill(ctx, x, y, height) {
    ctx.beginPath();
    ctx.moveTo(x - height, y);
    ctx.quadraticCurveTo(x, y - height, x + height, y);
    ctx.fill();
  }
  
  renderTiles(tiles, camera) {
    const ctx = this.ctx;
    const startCol = Math.floor(camera.x / TILE_SIZE);
    const endCol = startCol + Math.ceil(camera.width / TILE_SIZE) + 1;
    
    for (let row = 0; row < tiles.length; row++) {
      for (let col = startCol; col <= endCol && col < tiles[0].length; col++) {
        if (col < 0) continue;
        
        const tileType = tiles[row][col];
        if (tileType === BLOCK_TYPES.EMPTY) continue;
        
        const screenX = col * TILE_SIZE - camera.x;
        const screenY = row * TILE_SIZE;
        
        this.renderTile(ctx, screenX, screenY, tileType);
      }
    }
  }
  
  renderTile(ctx, x, y, type) {
    switch(type) {
      case BLOCK_TYPES.GROUND:
      case BLOCK_TYPES.HARD_BLOCK:
        ctx.fillStyle = '#c84c0c';
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = '#e87858';
        ctx.fillRect(x + 2, y + 2, TILE_SIZE - 4, 2);
        ctx.fillRect(x + 2, y + 2, 2, TILE_SIZE - 4);
        ctx.fillStyle = '#8b2500';
        ctx.fillRect(x, y + TILE_SIZE - 2, TILE_SIZE, 2);
        ctx.fillRect(x + TILE_SIZE - 2, y, 2, TILE_SIZE);
        
        ctx.strokeStyle = '#5c1a00';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 2, y + 2, TILE_SIZE / 2 - 3, TILE_SIZE / 2 - 3);
        ctx.strokeRect(x + TILE_SIZE / 2, y + 2, TILE_SIZE / 2 - 3, TILE_SIZE / 2 - 3);
        ctx.strokeRect(x + 2, y + TILE_SIZE / 2, TILE_SIZE / 2 - 3, TILE_SIZE / 2 - 3);
        ctx.strokeRect(x + TILE_SIZE / 2, y + TILE_SIZE / 2, TILE_SIZE / 2 - 3, TILE_SIZE / 2 - 3);
        break;
        
      case BLOCK_TYPES.BRICK:
        ctx.fillStyle = COLORS.BRICK;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = '#e87858';
        ctx.fillRect(x + 1, y + 1, TILE_SIZE - 2, 1);
        ctx.fillStyle = '#8b2500';
        for (let row = 0; row < 4; row++) {
          const offsetX = row % 2 === 0 ? 0 : TILE_SIZE / 4;
          ctx.strokeStyle = '#5c1a00';
          ctx.lineWidth = 1;
          ctx.strokeRect(x + offsetX, y + row * 8, TILE_SIZE / 2, 8);
          ctx.strokeRect(x + offsetX + TILE_SIZE / 2, y + row * 8, TILE_SIZE / 2, 8);
        }
        break;
        
      case BLOCK_TYPES.QUESTION_COIN:
      case BLOCK_TYPES.QUESTION_MUSHROOM:
      case BLOCK_TYPES.QUESTION_FIRE:
        ctx.fillStyle = '#e8a000';
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = COLORS.QUESTION_BLOCK;
        ctx.fillRect(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4);
        ctx.fillStyle = '#b8860b';
        ctx.fillRect(x + 4, y + 4, TILE_SIZE - 8, TILE_SIZE - 8);
        ctx.fillStyle = '#8b6914';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('?', x + TILE_SIZE / 2, y + TILE_SIZE / 2 + 1);
        ctx.fillStyle = '#fff';
        ctx.fillText('?', x + TILE_SIZE / 2 - 1, y + TILE_SIZE / 2);
        break;
        
      case BLOCK_TYPES.QUESTION_EMPTY:
        ctx.fillStyle = '#886830';
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = '#604820';
        ctx.fillRect(x + 4, y + 4, TILE_SIZE - 8, TILE_SIZE - 8);
        break;
        
      case BLOCK_TYPES.PIPE_TOP_LEFT:
        ctx.fillStyle = '#00d800';
        ctx.fillRect(x - 4, y, TILE_SIZE + 4, TILE_SIZE);
        ctx.fillStyle = '#00a800';
        ctx.fillRect(x - 4, y, 6, TILE_SIZE);
        ctx.fillStyle = '#50f850';
        ctx.fillRect(x + TILE_SIZE - 8, y + 4, 6, TILE_SIZE - 4);
        ctx.fillStyle = '#008000';
        ctx.fillRect(x - 4, y, TILE_SIZE + 8, 4);
        break;
        
      case BLOCK_TYPES.PIPE_TOP_RIGHT:
        ctx.fillStyle = '#00d800';
        ctx.fillRect(x, y, TILE_SIZE + 4, TILE_SIZE);
        ctx.fillStyle = '#50f850';
        ctx.fillRect(x + 2, y + 4, 6, TILE_SIZE - 4);
        ctx.fillStyle = '#00a800';
        ctx.fillRect(x + TILE_SIZE - 2, y, 6, TILE_SIZE);
        ctx.fillStyle = '#008000';
        ctx.fillRect(x - 4, y, TILE_SIZE + 8, 4);
        break;
        
      case BLOCK_TYPES.PIPE_BODY_LEFT:
        ctx.fillStyle = '#00d800';
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = '#00a800';
        ctx.fillRect(x, y, 6, TILE_SIZE);
        ctx.fillStyle = '#50f850';
        ctx.fillRect(x + TILE_SIZE - 8, y, 6, TILE_SIZE);
        break;
        
      case BLOCK_TYPES.PIPE_BODY_RIGHT:
        ctx.fillStyle = '#00d800';
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = '#50f850';
        ctx.fillRect(x + 2, y, 6, TILE_SIZE);
        ctx.fillStyle = '#00a800';
        ctx.fillRect(x + TILE_SIZE - 6, y, 6, TILE_SIZE);
        break;
    }
  }
}

export default SpriteRenderer;
