import { BLOCK_TYPES } from '../constants';

const level4 = {
  id: 4,
  name: 'World 1-4',
  width: 180,
  height: 15,
  playerStart: { x: 64, y: 384 },
  timeLimit: 280,
  
  generate: (tiles) => {
    const levelWidth = 180;
    const levelHeight = 15;
    
    for (let col = 0; col < levelWidth; col++) {
      tiles[levelHeight - 1][col] = BLOCK_TYPES.GROUND;
      tiles[levelHeight - 2][col] = BLOCK_TYPES.GROUND;
    }
    
    return {
      gaps: [
        { start: 22, end: 26 },
        { start: 50, end: 54 },
        { start: 80, end: 85 },
        { start: 115, end: 119 },
        { start: 145, end: 149 }
      ],
      questionBlocks: [
        { col: 10, row: 10, content: 'coin' },
        { col: 15, row: 9, content: 'mushroom' },
        { col: 30, row: 10, content: 'fire' },
        { col: 45, row: 8, content: 'coin' },
        { col: 65, row: 10, content: 'mushroom' },
        { col: 90, row: 9, content: 'coin' },
        { col: 105, row: 8, content: 'fire' },
        { col: 125, row: 10, content: 'mushroom' },
        { col: 155, row: 9, content: 'coin' },
        { col: 165, row: 8, content: 'fire' }
      ],
      brickRows: [
        { start: 8, row: 10, length: 6 },
        { start: 28, row: 10, length: 5 },
        { start: 40, row: 8, length: 8 },
        { start: 60, row: 10, length: 8 },
        { start: 88, row: 9, length: 6 },
        { start: 100, row: 8, length: 10 },
        { start: 122, row: 10, length: 8 },
        { start: 152, row: 9, length: 8 },
        { start: 162, row: 8, length: 6 }
      ],
      staircases: [
        { start: 18, height: 4, ascending: true },
        { start: 35, height: 5, ascending: false },
        { start: 55, height: 3, ascending: true },
        { start: 75, height: 6, ascending: true },
        { start: 95, height: 4, ascending: false },
        { start: 110, height: 5, ascending: true },
        { start: 135, height: 4, ascending: false },
        { start: 160, height: 3, ascending: true },
        { start: 172, height: 8, ascending: true }
      ],
      pipes: [
        { col: 27, height: 2 },
        { col: 58, height: 3 },
        { col: 86, height: 2 },
        { col: 120, height: 3 },
        { col: 155, height: 4 }
      ],
      enemies: [
        { col: 12, row: 13 },
        { col: 16, row: 8 },
        { col: 32, row: 13 },
        { col: 42, row: 7 },
        { col: 44, row: 7 },
        { col: 62, row: 13 },
        { col: 68, row: 13 },
        { col: 78, row: 13 },
        { col: 92, row: 8 },
        { col: 102, row: 7 },
        { col: 108, row: 7 },
        { col: 128, row: 13 },
        { col: 140, row: 13 },
        { col: 158, row: 8 },
        { col: 168, row: 13 }
      ],
      coins: [
        { col: 9, row: 8 },
        { col: 10, row: 8 },
        { col: 11, row: 8 },
        { col: 29, row: 8 },
        { col: 30, row: 8 },
        { col: 41, row: 6 },
        { col: 43, row: 6 },
        { col: 45, row: 6 },
        { col: 63, row: 8 },
        { col: 64, row: 8 },
        { col: 65, row: 8 },
        { col: 89, row: 7 },
        { col: 90, row: 7 },
        { col: 101, row: 6 },
        { col: 103, row: 6 },
        { col: 105, row: 6 },
        { col: 123, row: 8 },
        { col: 124, row: 8 },
        { col: 153, row: 7 },
        { col: 154, row: 7 },
        { col: 163, row: 6 },
        { col: 165, row: 6 }
      ],
      checkpoints: [
        { col: 55, row: 13 },
        { col: 110, row: 13 },
        { col: 155, row: 13 }
      ],
      flag: { col: 175, row: 13 }
    };
  }
};

export default level4;
