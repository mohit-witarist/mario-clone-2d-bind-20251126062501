import { BLOCK_TYPES } from '../constants';

const level2 = {
  id: 2,
  name: 'World 1-2',
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
        { start: 20, end: 23 },
        { start: 55, end: 58 },
        { start: 90, end: 94 },
        { start: 130, end: 133 }
      ],
      questionBlocks: [
        { col: 10, row: 10, content: 'coin' },
        { col: 15, row: 10, content: 'mushroom' },
        { col: 35, row: 9, content: 'coin' },
        { col: 45, row: 10, content: 'fire' },
        { col: 70, row: 8, content: 'mushroom' },
        { col: 100, row: 10, content: 'coin' },
        { col: 110, row: 9, content: 'fire' },
        { col: 140, row: 10, content: 'mushroom' },
        { col: 160, row: 8, content: 'coin' }
      ],
      brickRows: [
        { start: 8, row: 10, length: 5 },
        { start: 30, row: 9, length: 8 },
        { start: 50, row: 10, length: 4 },
        { start: 65, row: 8, length: 10 },
        { start: 105, row: 9, length: 6 },
        { start: 135, row: 10, length: 8 },
        { start: 155, row: 8, length: 10 }
      ],
      staircases: [
        { start: 25, height: 3, ascending: true },
        { start: 40, height: 5, ascending: true },
        { start: 60, height: 4, ascending: false },
        { start: 85, height: 6, ascending: true },
        { start: 120, height: 4, ascending: true },
        { start: 145, height: 5, ascending: false },
        { start: 170, height: 8, ascending: true }
      ],
      pipes: [
        { col: 28, height: 2 },
        { col: 78, height: 3 },
        { col: 115, height: 2 },
        { col: 150, height: 4 }
      ],
      enemies: [
        { col: 12, row: 13 },
        { col: 18, row: 13 },
        { col: 33, row: 8 },
        { col: 42, row: 13 },
        { col: 52, row: 13 },
        { col: 68, row: 7 },
        { col: 72, row: 7 },
        { col: 95, row: 13 },
        { col: 108, row: 8 },
        { col: 125, row: 13 },
        { col: 138, row: 13 },
        { col: 158, row: 7 },
        { col: 165, row: 13 }
      ],
      coins: [
        { col: 9, row: 8 },
        { col: 10, row: 8 },
        { col: 11, row: 8 },
        { col: 32, row: 7 },
        { col: 34, row: 7 },
        { col: 36, row: 7 },
        { col: 66, row: 6 },
        { col: 67, row: 6 },
        { col: 68, row: 6 },
        { col: 69, row: 6 },
        { col: 107, row: 7 },
        { col: 108, row: 7 },
        { col: 156, row: 6 },
        { col: 157, row: 6 },
        { col: 158, row: 6 }
      ],
      checkpoints: [
        { col: 60, row: 13 },
        { col: 120, row: 13 }
      ],
      flag: { col: 175, row: 13 }
    };
  }
};

export default level2;
