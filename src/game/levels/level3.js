import { BLOCK_TYPES } from '../constants';

const level3 = {
  id: 3,
  name: 'World 1-3',
  width: 160,
  height: 15,
  playerStart: { x: 64, y: 384 },
  timeLimit: 260,
  
  generate: (tiles) => {
    const levelWidth = 160;
    const levelHeight = 15;
    
    for (let col = 0; col < levelWidth; col++) {
      tiles[levelHeight - 1][col] = BLOCK_TYPES.GROUND;
      tiles[levelHeight - 2][col] = BLOCK_TYPES.GROUND;
    }
    
    return {
      gaps: [
        { start: 18, end: 21 },
        { start: 40, end: 44 },
        { start: 70, end: 73 },
        { start: 100, end: 105 },
        { start: 125, end: 128 }
      ],
      questionBlocks: [
        { col: 12, row: 10, content: 'mushroom' },
        { col: 25, row: 9, content: 'coin' },
        { col: 35, row: 10, content: 'coin' },
        { col: 55, row: 8, content: 'fire' },
        { col: 80, row: 10, content: 'mushroom' },
        { col: 95, row: 9, content: 'coin' },
        { col: 115, row: 8, content: 'fire' },
        { col: 140, row: 10, content: 'mushroom' }
      ],
      brickRows: [
        { start: 10, row: 10, length: 4 },
        { start: 23, row: 9, length: 5 },
        { start: 50, row: 8, length: 8 },
        { start: 75, row: 10, length: 6 },
        { start: 90, row: 9, length: 8 },
        { start: 110, row: 8, length: 10 },
        { start: 135, row: 10, length: 8 }
      ],
      staircases: [
        { start: 15, height: 3, ascending: true },
        { start: 30, height: 4, ascending: false },
        { start: 45, height: 5, ascending: true },
        { start: 65, height: 4, ascending: false },
        { start: 85, height: 3, ascending: true },
        { start: 108, height: 6, ascending: true },
        { start: 130, height: 5, ascending: false },
        { start: 150, height: 8, ascending: true }
      ],
      pipes: [
        { col: 33, height: 2 },
        { col: 62, height: 3 },
        { col: 88, height: 2 },
        { col: 132, height: 4 }
      ],
      enemies: [
        { col: 8, row: 13 },
        { col: 14, row: 13 },
        { col: 27, row: 8 },
        { col: 38, row: 13 },
        { col: 52, row: 7 },
        { col: 54, row: 7 },
        { col: 68, row: 13 },
        { col: 78, row: 13 },
        { col: 82, row: 13 },
        { col: 93, row: 8 },
        { col: 112, row: 7 },
        { col: 120, row: 13 },
        { col: 138, row: 13 },
        { col: 145, row: 13 }
      ],
      coins: [
        { col: 11, row: 8 },
        { col: 12, row: 8 },
        { col: 24, row: 7 },
        { col: 25, row: 7 },
        { col: 26, row: 7 },
        { col: 51, row: 6 },
        { col: 53, row: 6 },
        { col: 55, row: 6 },
        { col: 91, row: 7 },
        { col: 92, row: 7 },
        { col: 93, row: 7 },
        { col: 111, row: 6 },
        { col: 113, row: 6 },
        { col: 115, row: 6 },
        { col: 136, row: 8 },
        { col: 137, row: 8 }
      ],
      checkpoints: [
        { col: 50, row: 13 },
        { col: 110, row: 13 }
      ],
      flag: { col: 155, row: 13 }
    };
  }
};

export default level3;
