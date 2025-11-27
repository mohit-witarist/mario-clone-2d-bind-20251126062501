import { BLOCK_TYPES } from '../constants';

const level6 = {
  id: 6,
  name: 'World 2-2',
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
        { start: 20, end: 25 },
        { start: 45, end: 50 },
        { start: 75, end: 82 },
        { start: 110, end: 115 },
        { start: 140, end: 145 }
      ],
      questionBlocks: [
        { col: 8, row: 10, content: 'mushroom' },
        { col: 15, row: 9, content: 'fire' },
        { col: 30, row: 10, content: 'coin' },
        { col: 40, row: 8, content: 'mushroom' },
        { col: 58, row: 10, content: 'fire' },
        { col: 70, row: 9, content: 'coin' },
        { col: 92, row: 8, content: 'mushroom' },
        { col: 105, row: 10, content: 'fire' },
        { col: 125, row: 9, content: 'coin' },
        { col: 135, row: 8, content: 'mushroom' },
        { col: 155, row: 10, content: 'fire' },
        { col: 165, row: 9, content: 'coin' }
      ],
      brickRows: [
        { start: 6, row: 10, length: 5 },
        { start: 13, row: 9, length: 5 },
        { start: 28, row: 10, length: 5 },
        { start: 35, row: 8, length: 10 },
        { start: 55, row: 10, length: 8 },
        { start: 65, row: 9, length: 8 },
        { start: 88, row: 8, length: 10 },
        { start: 100, row: 10, length: 10 },
        { start: 120, row: 9, length: 10 },
        { start: 132, row: 8, length: 8 },
        { start: 150, row: 10, length: 10 },
        { start: 162, row: 9, length: 8 }
      ],
      staircases: [
        { start: 18, height: 5, ascending: true },
        { start: 32, height: 4, ascending: false },
        { start: 52, height: 5, ascending: true },
        { start: 62, height: 3, ascending: false },
        { start: 83, height: 7, ascending: true },
        { start: 98, height: 5, ascending: false },
        { start: 116, height: 6, ascending: true },
        { start: 128, height: 4, ascending: false },
        { start: 146, height: 6, ascending: true },
        { start: 172, height: 8, ascending: true }
      ],
      pipes: [
        { col: 26, height: 3 },
        { col: 43, height: 2 },
        { col: 73, height: 4 },
        { col: 108, height: 3 },
        { col: 138, height: 2 },
        { col: 160, height: 3 }
      ],
      enemies: [
        { col: 10, row: 13 },
        { col: 16, row: 8 },
        { col: 28, row: 13 },
        { col: 36, row: 7 },
        { col: 42, row: 7 },
        { col: 56, row: 13 },
        { col: 60, row: 13 },
        { col: 68, row: 8 },
        { col: 85, row: 13 },
        { col: 90, row: 7 },
        { col: 95, row: 7 },
        { col: 102, row: 13 },
        { col: 107, row: 13 },
        { col: 122, row: 8 },
        { col: 133, row: 7 },
        { col: 148, row: 13 },
        { col: 152, row: 13 },
        { col: 158, row: 13 },
        { col: 168, row: 8 }
      ],
      coins: [
        { col: 7, row: 8 },
        { col: 8, row: 8 },
        { col: 9, row: 8 },
        { col: 14, row: 7 },
        { col: 15, row: 7 },
        { col: 16, row: 7 },
        { col: 29, row: 8 },
        { col: 30, row: 8 },
        { col: 36, row: 6 },
        { col: 38, row: 6 },
        { col: 40, row: 6 },
        { col: 56, row: 8 },
        { col: 58, row: 8 },
        { col: 66, row: 7 },
        { col: 68, row: 7 },
        { col: 70, row: 7 },
        { col: 89, row: 6 },
        { col: 91, row: 6 },
        { col: 93, row: 6 },
        { col: 101, row: 8 },
        { col: 103, row: 8 },
        { col: 105, row: 8 },
        { col: 121, row: 7 },
        { col: 123, row: 7 },
        { col: 125, row: 7 },
        { col: 133, row: 6 },
        { col: 135, row: 6 },
        { col: 151, row: 8 },
        { col: 153, row: 8 },
        { col: 155, row: 8 },
        { col: 163, row: 7 },
        { col: 165, row: 7 }
      ],
      checkpoints: [
        { col: 55, row: 13 },
        { col: 100, row: 13 },
        { col: 150, row: 13 }
      ],
      flag: { col: 175, row: 13 }
    };
  }
};

export default level6;
