import { TILE_SIZE, BLOCK_TYPES } from './constants';
import Block from './Block';
import Enemy from './Enemy';
import Coin from './Coin';
import Checkpoint from './Checkpoint';
import Flag from './Flag';

class Level {
  constructor(levelConfig) {
    this.config = levelConfig;
    this.tiles = [];
    this.blocks = [];
    this.enemies = [];
    this.coins = [];
    this.checkpoints = [];
    this.flag = null;
    this.width = 0;
    this.height = 0;
    
    this.generateLevel();
  }
  
  generateLevel() {
    const levelWidth = this.config.width;
    const levelHeight = this.config.height;
    
    this.tiles = Array(levelHeight).fill(null).map(() => 
      Array(levelWidth).fill(BLOCK_TYPES.EMPTY)
    );
    
    const data = this.config.generate(this.tiles);
    
    if (data.gaps) {
      data.gaps.forEach(gap => this.addGap(gap.start, gap.end));
    }
    
    if (data.questionBlocks) {
      data.questionBlocks.forEach(qb => this.addQuestionBlock(qb.col, qb.row, qb.content));
    }
    
    if (data.brickRows) {
      data.brickRows.forEach(br => this.addBrickRow(br.start, br.row, br.length));
    }
    
    if (data.staircases) {
      data.staircases.forEach(sc => this.addStaircase(sc.start, sc.height, sc.ascending));
    }
    
    if (data.pipes) {
      data.pipes.forEach(pipe => this.addPipe(pipe.col, pipe.height));
    }
    
    if (data.enemies) {
      data.enemies.forEach(enemy => this.addEnemy(enemy.col, enemy.row));
    }
    
    if (data.coins) {
      data.coins.forEach(coin => this.addCoin(coin.col, coin.row));
    }
    
    if (data.checkpoints) {
      data.checkpoints.forEach(cp => this.addCheckpoint(cp.col, cp.row));
    }
    
    if (data.flag) {
      this.flag = new Flag(data.flag.col, data.flag.row);
    }
    
    this.width = levelWidth * TILE_SIZE;
    this.height = levelHeight * TILE_SIZE;
  }
  
  addGap(startCol, endCol) {
    for (let col = startCol; col <= endCol; col++) {
      this.tiles[this.tiles.length - 1][col] = BLOCK_TYPES.EMPTY;
      this.tiles[this.tiles.length - 2][col] = BLOCK_TYPES.EMPTY;
    }
  }
  
  addQuestionBlock(col, row, content) {
    let type;
    switch(content) {
      case 'coin': type = BLOCK_TYPES.QUESTION_COIN; break;
      case 'mushroom': type = BLOCK_TYPES.QUESTION_MUSHROOM; break;
      case 'fire': type = BLOCK_TYPES.QUESTION_FIRE; break;
      default: type = BLOCK_TYPES.QUESTION_COIN;
    }
    this.tiles[row][col] = type;
    this.blocks.push(new Block(row, col, type));
  }
  
  addBrickRow(startCol, row, length) {
    for (let i = 0; i < length; i++) {
      this.tiles[row][startCol + i] = BLOCK_TYPES.BRICK;
    }
  }
  
  addStaircase(startCol, height, ascending) {
    const levelHeight = this.tiles.length;
    for (let h = 1; h <= height; h++) {
      const col = ascending ? startCol + h - 1 : startCol + height - h;
      for (let row = levelHeight - 2 - h; row < levelHeight - 2; row++) {
        if (row >= 0 && col >= 0 && col < this.tiles[0].length) {
          this.tiles[row][col] = BLOCK_TYPES.HARD_BLOCK;
        }
      }
    }
  }
  
  addPipe(col, height) {
    const levelHeight = this.tiles.length;
    const topRow = levelHeight - 2 - height;
    
    if (col + 1 < this.tiles[0].length) {
      this.tiles[topRow][col] = BLOCK_TYPES.PIPE_TOP_LEFT;
      this.tiles[topRow][col + 1] = BLOCK_TYPES.PIPE_TOP_RIGHT;
      
      for (let row = topRow + 1; row < levelHeight - 2; row++) {
        this.tiles[row][col] = BLOCK_TYPES.PIPE_BODY_LEFT;
        this.tiles[row][col + 1] = BLOCK_TYPES.PIPE_BODY_RIGHT;
      }
    }
  }
  
  addEnemy(col, row) {
    this.enemies.push(new Enemy(col * TILE_SIZE, row * TILE_SIZE));
  }
  
  addCoin(col, row) {
    this.coins.push(new Coin(col * TILE_SIZE + 4, row * TILE_SIZE + 4));
  }
  
  addCheckpoint(col, row) {
    this.checkpoints.push(new Checkpoint(col, row));
  }
  
  getBlockAt(row, col) {
    return this.blocks.find(b => b.row === row && b.col === col);
  }
  
  reset() {
    this.blocks = [];
    this.enemies = [];
    this.coins = [];
    this.checkpoints = [];
    this.flag = null;
    this.generateLevel();
  }
}

export default Level;
