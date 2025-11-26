import { TILE_SIZE, BLOCK_TYPES, ENTITY_TYPES } from './constants';
import Block from './Block';
import Enemy from './Enemy';
import Coin from './Coin';

class Level {
  constructor() {
    this.tiles = [];
    this.blocks = [];
    this.enemies = [];
    this.coins = [];
    this.width = 0;
    this.height = 0;
    
    this.generateLevel();
  }
  
  generateLevel() {
    const levelWidth = 200;
    const levelHeight = 15;
    
    this.tiles = Array(levelHeight).fill(null).map(() => 
      Array(levelWidth).fill(BLOCK_TYPES.EMPTY)
    );
    
    for (let col = 0; col < levelWidth; col++) {
      this.tiles[levelHeight - 1][col] = BLOCK_TYPES.GROUND;
      this.tiles[levelHeight - 2][col] = BLOCK_TYPES.GROUND;
    }
    
    this.addGap(15, 17);
    this.addGap(45, 47);
    this.addGap(75, 78);
    this.addGap(120, 123);
    this.addGap(160, 162);
    
    this.addQuestionBlock(8, 10, 'coin');
    this.addQuestionBlock(12, 10, 'mushroom');
    this.addBrickRow(10, 10, 3);
    
    this.addBrickRow(20, 9, 5);
    this.addQuestionBlock(22, 9, 'coin');
    
    this.addQuestionBlock(30, 10, 'coin');
    this.addQuestionBlock(32, 10, 'fire');
    this.addQuestionBlock(34, 10, 'coin');
    this.addBrickRow(29, 10, 1);
    this.addBrickRow(35, 10, 1);
    
    this.addStaircase(38, 4, true);
    this.addStaircase(50, 4, false);
    
    this.addPipe(55, 2);
    this.addPipe(65, 3);
    
    this.addBrickRow(58, 8, 8);
    this.addQuestionBlock(60, 8, 'mushroom');
    this.addQuestionBlock(62, 8, 'coin');
    this.addQuestionBlock(64, 8, 'coin');
    
    this.addQuestionBlock(70, 6, 'fire');
    this.addBrickRow(68, 6, 2);
    this.addBrickRow(72, 6, 2);
    
    this.addStaircase(80, 5, true);
    
    this.addBrickRow(88, 7, 10);
    this.addQuestionBlock(92, 7, 'coin');
    
    this.addQuestionBlock(105, 10, 'mushroom');
    this.addBrickRow(103, 10, 5);
    
    this.addPipe(110, 2);
    this.addPipe(115, 4);
    
    this.addStaircase(125, 6, true);
    this.addStaircase(135, 6, false);
    
    this.addBrickRow(140, 8, 12);
    this.addQuestionBlock(144, 8, 'coin');
    this.addQuestionBlock(146, 8, 'fire');
    this.addQuestionBlock(148, 8, 'coin');
    
    this.addPipe(155, 3);
    
    this.addStaircase(165, 4, true);
    this.addBrickRow(170, 9, 8);
    this.addQuestionBlock(173, 9, 'mushroom');
    this.addQuestionBlock(175, 9, 'coin');
    
    this.addStaircase(185, 8, true);
    
    this.addEnemy(10, levelHeight - 3);
    this.addEnemy(25, levelHeight - 3);
    this.addEnemy(26, levelHeight - 3);
    this.addEnemy(35, levelHeight - 3);
    this.addEnemy(60, 7);
    this.addEnemy(70, levelHeight - 3);
    this.addEnemy(71, levelHeight - 3);
    this.addEnemy(85, levelHeight - 3);
    this.addEnemy(90, 6);
    this.addEnemy(100, levelHeight - 3);
    this.addEnemy(108, levelHeight - 3);
    this.addEnemy(118, levelHeight - 3);
    this.addEnemy(130, levelHeight - 3);
    this.addEnemy(131, levelHeight - 3);
    this.addEnemy(142, 7);
    this.addEnemy(150, levelHeight - 3);
    this.addEnemy(168, levelHeight - 3);
    this.addEnemy(172, 8);
    this.addEnemy(180, levelHeight - 3);
    
    this.addCoin(11, 8);
    this.addCoin(13, 8);
    this.addCoin(21, 7);
    this.addCoin(22, 7);
    this.addCoin(23, 7);
    this.addCoin(61, 6);
    this.addCoin(62, 6);
    this.addCoin(63, 6);
    this.addCoin(91, 5);
    this.addCoin(92, 5);
    this.addCoin(93, 5);
    this.addCoin(104, 8);
    this.addCoin(105, 8);
    this.addCoin(106, 8);
    this.addCoin(143, 6);
    this.addCoin(144, 6);
    this.addCoin(145, 6);
    this.addCoin(171, 7);
    this.addCoin(172, 7);
    this.addCoin(173, 7);
    
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
        if (row >= 0) {
          this.tiles[row][col] = BLOCK_TYPES.HARD_BLOCK;
        }
      }
    }
  }
  
  addPipe(col, height) {
    const levelHeight = this.tiles.length;
    const topRow = levelHeight - 2 - height;
    
    this.tiles[topRow][col] = BLOCK_TYPES.PIPE_TOP_LEFT;
    this.tiles[topRow][col + 1] = BLOCK_TYPES.PIPE_TOP_RIGHT;
    
    for (let row = topRow + 1; row < levelHeight - 2; row++) {
      this.tiles[row][col] = BLOCK_TYPES.PIPE_BODY_LEFT;
      this.tiles[row][col + 1] = BLOCK_TYPES.PIPE_BODY_RIGHT;
    }
  }
  
  addEnemy(col, row) {
    this.enemies.push(new Enemy(col * TILE_SIZE, row * TILE_SIZE));
  }
  
  addCoin(col, row) {
    this.coins.push(new Coin(col * TILE_SIZE + 4, row * TILE_SIZE + 4));
  }
  
  getBlockAt(row, col) {
    return this.blocks.find(b => b.row === row && b.col === col);
  }
  
  reset() {
    this.blocks = [];
    this.enemies = [];
    this.coins = [];
    this.generateLevel();
  }
}

export default Level;
