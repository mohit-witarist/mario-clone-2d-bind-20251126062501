import { BLOCK_TYPES } from '../constants';

const level8 = {
  id: 8,
  name: 'World 2-4',
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
        { start: 22, end: 28 },
        { start: 50, end: 56 },
        { start: 80, end: 88 },
        { start: 115, end: 122 },
        { start: 150, end: 156 },
        { start: 175, end: 180 }
      ],
      questionBlocks: [
        { col: 10, row: 10, content: 'fire' },
        { col: 18, row: 9, content: 'mushroom' },
        { col: 35, row: 8, content: 'fire' },
        { col: 45, row: 10, content: 'coin' },
        { col: 65, row: 9, content: 'mushroom' },
        { col: 75, row: 8, content: 'fire' },
        { col: 95, row: 10, content: 'coin' },
        { col: 105, row: 9, content: 'mushroom' },
        { col: 130, row: 8, content: 'fire' },
        { col: 140, row: 10, content: 'coin' },
        { col: 160, row: 9, content: 'mushroom' },
        { col: 170, row: 8, content: 'fire' },
        { col: 188, row: 10, content: 'mushroom' }
      ],
      brickRows: [
        { start: 8, row: 10, length: 6 },
        { start: 15, row: 9, length: 6 },
        { start: 30, row: 8, length: 10 },
        { start: 42, row: 10, length: 6 },
        { start: 60, row: 9, length: 10 },
        { start: 72, row: 8, length: 8 },
        { start: 90, row: 10, length: 10 },
        { start: 100, row: 9, length: 10 },
        { start: 125, row: 8, length: 10 },
        { start: 138, row: 10, length: 8 },
        { start: 158, row: 9, length: 8 },
        { start: 168, row: 8, length: 6 },
        { start: 185, row: 10, length: 8 }
      ],
      staircases: [
        { start: 19, height: 5, ascending: true },
        { start: 32, height: 4, ascending: false },
        { start: 57, height: 6, ascending: true },
        { start: 68, height: 4, ascending: false },
        { start: 89, height: 7, ascending: true },
        { start: 98, height: 5, ascending: false },
        { start: 123, height: 6, ascending: true },
        { start: 135, height: 4, ascending: false },
        { start: 157, height: 5, ascending: true },
        { start: 165, height: 3, ascending: false },
        { start: 181, height: 6, ascending: true },
        { start: 192, height: 8, ascending: true }
      ],
      pipes: [
        { col: 28, height: 3 },
        { col: 48, height: 2 },
        { col: 78, height: 4 },
        { col: 113, height: 3 },
        { col: 148, height: 2 },
        { col: 173, height: 4 }
      ],
      enemies: [
        { col: 12, row: 13 },
        { col: 16, row: 8 },
        { col: 20, row: 8 },
        { col: 34, row: 7 },
        { col: 38, row: 7 },
        { col: 44, row: 13 },
        { col: 62, row: 8 },
        { col: 66, row: 8 },
        { col: 74, row: 7 },
        { col: 92, row: 13 },
        { col: 96, row: 13 },
        { col: 102, row: 8 },
        { col: 106, row: 8 },
        { col: 127, row: 7 },
        { col: 132, row: 7 },
        { col: 142, row: 13 },
        { col: 146, row: 13 },
        { col: 162, row: 8 },
        { col: 170, row: 7 },
        { col: 183, row: 13 },
        { col: 186, row: 13 }
      ],
      coins: [
        { col: 9, row: 8 },
        { col: 10, row: 8 },
        { col: 11, row: 8 },
        { col: 16, row: 7 },
        { col: 18, row: 7 },
        { col: 31, row: 6 },
        { col: 33, row: 6 },
        { col: 35, row: 6 },
        { col: 43, row: 8 },
        { col: 45, row: 8 },
        { col: 61, row: 7 },
        { col: 63, row: 7 },
        { col: 65, row: 7 },
        { col: 73, row: 6 },
        { col: 75, row: 6 },
        { col: 91, row: 8 },
        { col: 93, row: 8 },
        { col: 95, row: 8 },
        { col: 101, row: 7 },
        { col: 103, row: 7 },
        { col: 105, row: 7 },
        { col: 126, row: 6 },
        { col: 128, row: 6 },
        { col: 130, row: 6 },
        { col: 139, row: 8 },
        { col: 141, row: 8 },
        { col: 159, row: 7 },
        { col: 161, row: 7 },
        { col: 169, row: 6 },
        { col: 171, row: 6 },
        { col: 186, row: 8 },
        { col: 188, row: 8 }
      ],
      checkpoints: [
        { col: 58, row: 13 },
        { col: 125, row: 13 },
        { col: 165, row: 13 }
      ],
      flag: { col: 195, row: 13 }
    };
  }
};

export default level8;
