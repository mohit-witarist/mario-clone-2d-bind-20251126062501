import { BLOCK_TYPES } from '../constants';

const level10 = {
  id: 10,
  name: 'World 3-2 (Final)',
  width: 220,
  height: 15,
  playerStart: { x: 64, y: 384 },
  timeLimit: 350,
  
  generate: (tiles) => {
    const levelWidth = 220;
    const levelHeight = 15;
    
    for (let col = 0; col < levelWidth; col++) {
      tiles[levelHeight - 1][col] = BLOCK_TYPES.GROUND;
      tiles[levelHeight - 2][col] = BLOCK_TYPES.GROUND;
    }
    
    return {
      gaps: [
        { start: 22, end: 28 },
        { start: 50, end: 58 },
        { start: 82, end: 90 },
        { start: 115, end: 124 },
        { start: 150, end: 158 },
        { start: 180, end: 188 }
      ],
      questionBlocks: [
        { col: 10, row: 10, content: 'fire' },
        { col: 16, row: 9, content: 'mushroom' },
        { col: 35, row: 8, content: 'fire' },
        { col: 45, row: 10, content: 'mushroom' },
        { col: 65, row: 9, content: 'fire' },
        { col: 78, row: 8, content: 'mushroom' },
        { col: 98, row: 10, content: 'fire' },
        { col: 108, row: 9, content: 'mushroom' },
        { col: 130, row: 8, content: 'fire' },
        { col: 142, row: 10, content: 'mushroom' },
        { col: 165, row: 9, content: 'fire' },
        { col: 175, row: 8, content: 'mushroom' },
        { col: 195, row: 10, content: 'fire' },
        { col: 205, row: 9, content: 'mushroom' }
      ],
      brickRows: [
        { start: 8, row: 10, length: 6 },
        { start: 14, row: 9, length: 6 },
        { start: 30, row: 8, length: 12 },
        { start: 42, row: 10, length: 8 },
        { start: 62, row: 9, length: 8 },
        { start: 74, row: 8, length: 8 },
        { start: 94, row: 10, length: 10 },
        { start: 104, row: 9, length: 10 },
        { start: 126, row: 8, length: 10 },
        { start: 140, row: 10, length: 8 },
        { start: 162, row: 9, length: 8 },
        { start: 172, row: 8, length: 8 },
        { start: 192, row: 10, length: 8 },
        { start: 202, row: 9, length: 10 }
      ],
      staircases: [
        { start: 20, height: 5, ascending: true },
        { start: 32, height: 4, ascending: false },
        { start: 59, height: 8, ascending: true },
        { start: 70, height: 6, ascending: false },
        { start: 91, height: 9, ascending: true },
        { start: 102, height: 7, ascending: false },
        { start: 125, height: 8, ascending: true },
        { start: 138, height: 6, ascending: false },
        { start: 159, height: 7, ascending: true },
        { start: 170, height: 5, ascending: false },
        { start: 189, height: 8, ascending: true },
        { start: 212, height: 8, ascending: true }
      ],
      pipes: [
        { col: 28, height: 3 },
        { col: 48, height: 5 },
        { col: 80, height: 6 },
        { col: 113, height: 5 },
        { col: 148, height: 4 },
        { col: 178, height: 5 }
      ],
      enemies: [
        { col: 10, row: 13 },
        { col: 14, row: 13 },
        { col: 18, row: 8 },
        { col: 32, row: 7 },
        { col: 36, row: 7 },
        { col: 40, row: 7 },
        { col: 44, row: 13 },
        { col: 48, row: 13 },
        { col: 64, row: 8 },
        { col: 68, row: 8 },
        { col: 75, row: 7 },
        { col: 78, row: 7 },
        { col: 96, row: 13 },
        { col: 100, row: 13 },
        { col: 106, row: 8 },
        { col: 110, row: 8 },
        { col: 128, row: 7 },
        { col: 132, row: 7 },
        { col: 136, row: 7 },
        { col: 144, row: 13 },
        { col: 148, row: 13 },
        { col: 164, row: 8 },
        { col: 168, row: 8 },
        { col: 173, row: 7 },
        { col: 176, row: 7 },
        { col: 194, row: 13 },
        { col: 198, row: 13 },
        { col: 204, row: 8 },
        { col: 208, row: 8 }
      ],
      coins: [
        { col: 9, row: 8 },
        { col: 10, row: 8 },
        { col: 11, row: 8 },
        { col: 15, row: 7 },
        { col: 17, row: 7 },
        { col: 31, row: 6 },
        { col: 33, row: 6 },
        { col: 35, row: 6 },
        { col: 37, row: 6 },
        { col: 43, row: 8 },
        { col: 45, row: 8 },
        { col: 63, row: 7 },
        { col: 65, row: 7 },
        { col: 67, row: 7 },
        { col: 75, row: 6 },
        { col: 77, row: 6 },
        { col: 79, row: 6 },
        { col: 95, row: 8 },
        { col: 97, row: 8 },
        { col: 99, row: 8 },
        { col: 105, row: 7 },
        { col: 107, row: 7 },
        { col: 109, row: 7 },
        { col: 127, row: 6 },
        { col: 129, row: 6 },
        { col: 131, row: 6 },
        { col: 141, row: 8 },
        { col: 143, row: 8 },
        { col: 163, row: 7 },
        { col: 165, row: 7 },
        { col: 167, row: 7 },
        { col: 173, row: 6 },
        { col: 175, row: 6 },
        { col: 193, row: 8 },
        { col: 195, row: 8 },
        { col: 203, row: 7 },
        { col: 205, row: 7 },
        { col: 207, row: 7 }
      ],
      checkpoints: [
        { col: 62, row: 13 },
        { col: 130, row: 13 },
        { col: 185, row: 13 }
      ],
      flag: { col: 215, row: 13 }
    };
  }
};

export default level10;
