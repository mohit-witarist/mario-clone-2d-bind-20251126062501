import { BLOCK_TYPES } from '../constants';

const level1 = {
  id: 1,
  name: 'World 1-1',
  width: 200,
  height: 15,
  playerStart: { x: 64, y: 384 },
  timeLimit: 300,
  
  generate: (tiles) => {
    const levelWidth = 200;
    const levelHeight = 15;
    
    for (let col = 0; col < levelWidth; col++) {
      tiles[levelHeight - 1][col] = BLOCK_TYPES.GROUND;
      tiles[levelHeight - 2][col] = BLOCK_TYPES.GROUND;
    }
    
    return {
      gaps: [
        { start: 15, end: 17 },
        { start: 45, end: 47 },
        { start: 75, end: 78 },
        { start: 120, end: 123 },
        { start: 160, end: 162 }
      ],
      questionBlocks: [
        { col: 8, row: 10, content: 'coin' },
        { col: 12, row: 10, content: 'mushroom' },
        { col: 22, row: 9, content: 'coin' },
        { col: 30, row: 10, content: 'coin' },
        { col: 32, row: 10, content: 'fire' },
        { col: 34, row: 10, content: 'coin' },
        { col: 60, row: 8, content: 'mushroom' },
        { col: 62, row: 8, content: 'coin' },
        { col: 64, row: 8, content: 'coin' },
        { col: 70, row: 6, content: 'fire' },
        { col: 92, row: 7, content: 'coin' },
        { col: 105, row: 10, content: 'mushroom' },
        { col: 144, row: 8, content: 'coin' },
        { col: 146, row: 8, content: 'fire' },
        { col: 148, row: 8, content: 'coin' },
        { col: 173, row: 9, content: 'mushroom' },
        { col: 175, row: 9, content: 'coin' }
      ],
      brickRows: [
        { start: 10, row: 10, length: 3 },
        { start: 20, row: 9, length: 5 },
        { start: 29, row: 10, length: 1 },
        { start: 35, row: 10, length: 1 },
        { start: 58, row: 8, length: 8 },
        { start: 68, row: 6, length: 2 },
        { start: 72, row: 6, length: 2 },
        { start: 88, row: 7, length: 10 },
        { start: 103, row: 10, length: 5 },
        { start: 140, row: 8, length: 12 },
        { start: 170, row: 9, length: 8 }
      ],
      staircases: [
        { start: 38, height: 4, ascending: true },
        { start: 50, height: 4, ascending: false },
        { start: 80, height: 5, ascending: true },
        { start: 125, height: 6, ascending: true },
        { start: 135, height: 6, ascending: false },
        { start: 165, height: 4, ascending: true },
        { start: 185, height: 8, ascending: true }
      ],
      pipes: [
        { col: 55, height: 2 },
        { col: 65, height: 3 },
        { col: 110, height: 2 },
        { col: 115, height: 4 },
        { col: 155, height: 3 }
      ],
      enemies: [
        { col: 10, row: 13 },
        { col: 25, row: 13 },
        { col: 26, row: 13 },
        { col: 35, row: 13 },
        { col: 60, row: 7 },
        { col: 70, row: 13 },
        { col: 71, row: 13 },
        { col: 85, row: 13 },
        { col: 90, row: 6 },
        { col: 100, row: 13 },
        { col: 108, row: 13 },
        { col: 118, row: 13 },
        { col: 130, row: 13 },
        { col: 131, row: 13 },
        { col: 142, row: 7 },
        { col: 150, row: 13 },
        { col: 168, row: 13 },
        { col: 172, row: 8 },
        { col: 180, row: 13 }
      ],
      coins: [
        { col: 11, row: 8 },
        { col: 13, row: 8 },
        { col: 21, row: 7 },
        { col: 22, row: 7 },
        { col: 23, row: 7 },
        { col: 61, row: 6 },
        { col: 62, row: 6 },
        { col: 63, row: 6 },
        { col: 91, row: 5 },
        { col: 92, row: 5 },
        { col: 93, row: 5 },
        { col: 104, row: 8 },
        { col: 105, row: 8 },
        { col: 106, row: 8 },
        { col: 143, row: 6 },
        { col: 144, row: 6 },
        { col: 145, row: 6 },
        { col: 171, row: 7 },
        { col: 172, row: 7 },
        { col: 173, row: 7 }
      ],
      checkpoints: [
        { col: 50, row: 13 },
        { col: 100, row: 13 },
        { col: 150, row: 13 }
      ],
      flag: { col: 195, row: 13 }
    };
  }
};

export default level1;
