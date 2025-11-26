import { TILE_SIZE, BLOCK_TYPES } from './constants';

class CollisionDetector {
  constructor(level) {
    this.level = level;
  }
  
  getTileAt(x, y) {
    const col = Math.floor(x / TILE_SIZE);
    const row = Math.floor(y / TILE_SIZE);
    
    if (row < 0 || row >= this.level.tiles.length) return BLOCK_TYPES.EMPTY;
    if (col < 0 || col >= this.level.tiles[0].length) return BLOCK_TYPES.EMPTY;
    
    return this.level.tiles[row][col];
  }
  
  isSolid(tileType) {
    return tileType !== BLOCK_TYPES.EMPTY;
  }
  
  checkEntityCollision(entity, tiles) {
    const left = entity.x;
    const right = entity.x + entity.width;
    const top = entity.y;
    const bottom = entity.y + entity.height;
    
    const collisions = {
      top: false,
      bottom: false,
      left: false,
      right: false,
      tiles: []
    };
    
    const startCol = Math.floor(left / TILE_SIZE);
    const endCol = Math.floor((right - 1) / TILE_SIZE);
    const startRow = Math.floor(top / TILE_SIZE);
    const endRow = Math.floor((bottom - 1) / TILE_SIZE);
    
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        if (row < 0 || row >= tiles.length) continue;
        if (col < 0 || col >= tiles[0].length) continue;
        
        const tileType = tiles[row][col];
        if (this.isSolid(tileType)) {
          collisions.tiles.push({ row, col, type: tileType });
        }
      }
    }
    
    return collisions;
  }
  
  resolveCollision(entity, velX, velY, tiles) {
    const response = {
      x: entity.x,
      y: entity.y,
      velX: velX,
      velY: velY,
      grounded: false,
      hitCeiling: false,
      hitWall: false,
      hitBlock: null
    };
    
    entity.x += velX;
    let collisions = this.checkEntityCollision(entity, tiles);
    
    for (const tile of collisions.tiles) {
      const tileLeft = tile.col * TILE_SIZE;
      const tileRight = tileLeft + TILE_SIZE;
      
      if (velX > 0) {
        entity.x = tileLeft - entity.width;
        response.hitWall = true;
      } else if (velX < 0) {
        entity.x = tileRight;
        response.hitWall = true;
      }
      response.velX = 0;
    }
    
    response.x = entity.x;
    
    entity.y += velY;
    collisions = this.checkEntityCollision(entity, tiles);
    
    for (const tile of collisions.tiles) {
      const tileTop = tile.row * TILE_SIZE;
      const tileBottom = tileTop + TILE_SIZE;
      
      if (velY > 0) {
        entity.y = tileTop - entity.height;
        response.grounded = true;
        response.velY = 0;
      } else if (velY < 0) {
        entity.y = tileBottom;
        response.hitCeiling = true;
        response.hitBlock = tile;
        response.velY = 0;
      }
    }
    
    response.y = entity.y;
    
    return response;
  }
  
  checkEntityVsEntity(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }
  
  getOverlapDirection(a, b) {
    const overlapX = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x);
    const overlapY = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);
    
    if (overlapX < overlapY) {
      return a.x < b.x ? 'right' : 'left';
    } else {
      return a.y < b.y ? 'bottom' : 'top';
    }
  }
}

export default CollisionDetector;
