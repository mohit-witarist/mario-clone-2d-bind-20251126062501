import { BLOCK_TYPES } from '../constants';

const level7 = {
  id: 7,
  name: 'World 2-3',
  width: 190,
  height: 15,
  playerStart: { x: 64, y: 384 },
  timeLimit: 290,
  
  generate: (tiles) => {
    const levelWidth = 190;
    const levelHeight = 15;
    
    for (let col = 0; col < levelWidth; col++) {
      tiles[levelHeight - 1][col] = BLOCK_TYPES.GROUND;
      tiles[levelHeight - 2][col] = BLOCK_TYPES.GROUND;
    }
    
    return {
      gaps: [
        { start: 18, end: 22 },
        { start: 40, end: 46 },
        { start: 70, end: 76 },
        { start: 100, end: 107 },
        { start: 135, end: 140 },
        { start: 160, end: 165 }
      ],
      questionBlocks: [
        { col: 10, row: 10, content: 'fire' },
        { col: 25, row: 9, content: 'mushroom' },
        { col: 35, row: 10, content: 'coin' },
        { col: 55, row: 8, content: 'fire' },
        { col: 65, row: 10, content: 'mushroom' },
        { col: 85, row: 9, content: 'coin' },
        { col: 95, row: 8, content: 'fire' },
        { col: 115, row: 10, content: 'mushroom' },
        { col: 125, row: 9, content: 'coin' },
        { col: 145, row: 8, content: 'fire' },
        { col: 155, row: 10, content: 'mushroom' },
        { col: 175, row: 9, content: 'coin' }
      ],
      brickRows: [
        { start: 8, row: 10, length: 5 },
        { start: 23, row: 9, length: 5 },
        { start: 32, row: 10, length: 6 },
        { start: 50, row: 8, length: 10 },
        { start: 62, row: 10, length: 6 },
        { start: 80, row: 9, length: 10 },
        { start: 92, row: 8, length: 8 },
        { start: 110, row: 10, length: 10 },
        { start: 122, row: 9, length: 8 },
        { start: 142, row: 8, length: 8 },
        { start: 152, row: 10, length: 8 },
        { start: 170, row: 9, length: 10 }
      ],
      staircases: [
        { start: 15, height: 4, ascending: true },
        { start: 28, height: 3, ascending: false },
        { start: 47, height: 6, ascending: true },
        { start: 58, height: 4, ascending: false },
        { start: 77, height: 7, ascending: true },
        { start: 88, height: 5, ascending: false },
        { start: 108, height: 6, ascending: true },
        { start: 118, height: 4, ascending: false },
        { start: 141, height: 5, ascending: true },
        { start: 148, height: 3, ascending: false },
        { start: 166, height: 6, ascending: true },
        { start: 182, height: 8, ascending: true }
      ],
      pipes: [
        { col: 22, height: 2 },
        { col: 38, height: 3 },
        { col: 68, height: 4 },
        { col: 98, height: 3 },
        { col: 130, height: 2 },
        { col: 158, height: 3 }
      ],
      enemies: [
        { col: 12, row: 13 },
        { col: 16, row: 13 },
        { col: 26, row: 8 },
        { col: 34, row: 13 },
        { col: 52, row: 7 },
        { col: 56, row: 7 },
        { col: 64, row: 13 },
        { col: 68, row: 13 },
        { col: 82, row: 8 },
        { col: 86, row: 8 },
        { col: 94, row: 7 },
        { col: 112, row: 13 },
        { col: 116, row: 13 },
        { col: 124, row: 8 },
        { col: 128, row: 8 },
        { col: 143, row: 7 },
        { col: 154, row: 13 },
        { col: 158, row: 13 },
        { col: 172, row: 8 },
        { col: 178, row: 13 }
      ],
      coins: [
        { col: 9, row: 8 },
        { col: 10, row: 8 },
        { col: 11, row: 8 },
        { col: 24, row: 7 },
        { col: 25, row: 7 },
        { col: 26, row: 7 },
        { col: 33, row: 8 },
        { col: 35, row: 8 },
        { col: 51, row: 6 },
        { col: 53, row: 6 },
        { col: 55, row: 6 },
        { col: 63, row: 8 },
        { col: 65, row: 8 },
        { col: 81, row: 7 },
        { col: 83, row: 7 },
        { col: 85, row: 7 },
        { col: 93, row: 6 },
        { col: 95, row: 6 },
        { col: 111, row: 8 },
        { col: 113, row: 8 },
        { col: 115, row: 8 },
        { col: 123, row: 7 },
        { col: 125, row: 7 },
        { col: 143, row: 6 },
        { col: 145, row: 6 },
        { col: 153, row: 8 },
        { col: 155, row: 8 },
        { col: 171, row: 7 },
        { col: 173, row: 7 },
        { col: 175, row: 7 }
      ],
      checkpoints: [
        { col: 50, row: 13 },
        { col: 110, row: 13 },
        { col: 155, row: 13 }
      ],
      flag: { col: 185, row: 13 }
    };
  }
};

export default level7;
