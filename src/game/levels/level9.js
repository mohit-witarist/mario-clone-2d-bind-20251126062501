import { BLOCK_TYPES } from '../constants';

const level9 = {
  id: 9,
  name: 'World 3-1',
  width: 210,
  height: 15,
  playerStart: { x: 64, y: 384 },
  timeLimit: 320,
  
  generate: (tiles) => {
    const levelWidth = 210;
    const levelHeight = 15;
    
    for (let col = 0; col < levelWidth; col++) {
      tiles[levelHeight - 1][col] = BLOCK_TYPES.GROUND;
      tiles[levelHeight - 2][col] = BLOCK_TYPES.GROUND;
    }
    
    return {
      gaps: [
        { start: 20, end: 26 },
        { start: 48, end: 55 },
        { start: 78, end: 86 },
        { start: 110, end: 118 },
        { start: 145, end: 152 },
        { start: 175, end: 182 }
      ],
      questionBlocks: [
        { col: 10, row: 10, content: 'fire' },
        { col: 15, row: 9, content: 'mushroom' },
        { col: 32, row: 8, content: 'fire' },
        { col: 42, row: 10, content: 'mushroom' },
        { col: 62, row: 9, content: 'coin' },
        { col: 72, row: 8, content: 'fire' },
        { col: 92, row: 10, content: 'mushroom' },
        { col: 102, row: 9, content: 'fire' },
        { col: 125, row: 8, content: 'coin' },
        { col: 138, row: 10, content: 'mushroom' },
        { col: 158, row: 9, content: 'fire' },
        { col: 168, row: 8, content: 'mushroom' },
        { col: 188, row: 10, content: 'fire' },
        { col: 198, row: 9, content: 'mushroom' }
      ],
      brickRows: [
        { start: 8, row: 10, length: 6 },
        { start: 12, row: 9, length: 6 },
        { start: 28, row: 8, length: 10 },
        { start: 40, row: 10, length: 6 },
        { start: 58, row: 9, length: 8 },
        { start: 68, row: 8, length: 10 },
        { start: 88, row: 10, length: 8 },
        { start: 98, row: 9, length: 10 },
        { start: 120, row: 8, length: 10 },
        { start: 135, row: 10, length: 8 },
        { start: 155, row: 9, length: 8 },
        { start: 165, row: 8, length: 8 },
        { start: 185, row: 10, length: 8 },
        { start: 195, row: 9, length: 8 }
      ],
      staircases: [
        { start: 18, height: 5, ascending: true },
        { start: 30, height: 4, ascending: false },
        { start: 56, height: 7, ascending: true },
        { start: 66, height: 5, ascending: false },
        { start: 87, height: 8, ascending: true },
        { start: 96, height: 6, ascending: false },
        { start: 119, height: 7, ascending: true },
        { start: 132, height: 5, ascending: false },
        { start: 153, height: 6, ascending: true },
        { start: 162, height: 4, ascending: false },
        { start: 183, height: 7, ascending: true },
        { start: 202, height: 8, ascending: true }
      ],
      pipes: [
        { col: 26, height: 3 },
        { col: 46, height: 4 },
        { col: 76, height: 5 },
        { col: 108, height: 4 },
        { col: 143, height: 3 },
        { col: 173, height: 4 }
      ],
      enemies: [
        { col: 10, row: 13 },
        { col: 14, row: 8 },
        { col: 18, row: 8 },
        { col: 30, row: 7 },
        { col: 35, row: 7 },
        { col: 42, row: 13 },
        { col: 60, row: 8 },
        { col: 64, row: 8 },
        { col: 70, row: 7 },
        { col: 74, row: 7 },
        { col: 90, row: 13 },
        { col: 94, row: 13 },
        { col: 100, row: 8 },
        { col: 104, row: 8 },
        { col: 122, row: 7 },
        { col: 128, row: 7 },
        { col: 138, row: 13 },
        { col: 142, row: 13 },
        { col: 156, row: 8 },
        { col: 160, row: 8 },
        { col: 166, row: 7 },
        { col: 170, row: 7 },
        { col: 186, row: 13 },
        { col: 190, row: 13 },
        { col: 196, row: 8 }
      ],
      coins: [
        { col: 9, row: 8 },
        { col: 10, row: 8 },
        { col: 11, row: 8 },
        { col: 13, row: 7 },
        { col: 15, row: 7 },
        { col: 29, row: 6 },
        { col: 31, row: 6 },
        { col: 33, row: 6 },
        { col: 41, row: 8 },
        { col: 43, row: 8 },
        { col: 59, row: 7 },
        { col: 61, row: 7 },
        { col: 63, row: 7 },
        { col: 69, row: 6 },
        { col: 71, row: 6 },
        { col: 73, row: 6 },
        { col: 89, row: 8 },
        { col: 91, row: 8 },
        { col: 93, row: 8 },
        { col: 99, row: 7 },
        { col: 101, row: 7 },
        { col: 103, row: 7 },
        { col: 121, row: 6 },
        { col: 123, row: 6 },
        { col: 125, row: 6 },
        { col: 136, row: 8 },
        { col: 138, row: 8 },
        { col: 156, row: 7 },
        { col: 158, row: 7 },
        { col: 166, row: 6 },
        { col: 168, row: 6 },
        { col: 186, row: 8 },
        { col: 188, row: 8 },
        { col: 196, row: 7 },
        { col: 198, row: 7 }
      ],
      checkpoints: [
        { col: 58, row: 13 },
        { col: 120, row: 13 },
        { col: 175, row: 13 }
      ],
      flag: { col: 205, row: 13 }
    };
  }
};

export default level9;
