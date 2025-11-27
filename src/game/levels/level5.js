import { BLOCK_TYPES } from '../constants';

const level5 = {
  id: 5,
  name: 'World 2-1',
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
        { start: 25, end: 29 },
        { start: 55, end: 60 },
        { start: 90, end: 95 },
        { start: 125, end: 130 },
        { start: 160, end: 165 }
      ],
      questionBlocks: [
        { col: 12, row: 10, content: 'mushroom' },
        { col: 18, row: 9, content: 'coin' },
        { col: 35, row: 10, content: 'fire' },
        { col: 50, row: 8, content: 'mushroom' },
        { col: 70, row: 10, content: 'coin' },
        { col: 85, row: 9, content: 'fire' },
        { col: 105, row: 8, content: 'mushroom' },
        { col: 120, row: 10, content: 'coin' },
        { col: 140, row: 9, content: 'fire' },
        { col: 155, row: 8, content: 'mushroom' },
        { col: 175, row: 10, content: 'coin' },
        { col: 185, row: 9, content: 'fire' }
      ],
      brickRows: [
        { start: 10, row: 10, length: 6 },
        { start: 16, row: 9, length: 5 },
        { start: 33, row: 10, length: 5 },
        { start: 45, row: 8, length: 10 },
        { start: 68, row: 10, length: 6 },
        { start: 80, row: 9, length: 8 },
        { start: 100, row: 8, length: 10 },
        { start: 115, row: 10, length: 8 },
        { start: 135, row: 9, length: 10 },
        { start: 150, row: 8, length: 10 },
        { start: 170, row: 10, length: 10 },
        { start: 182, row: 9, length: 8 }
      ],
      staircases: [
        { start: 20, height: 4, ascending: true },
        { start: 40, height: 5, ascending: false },
        { start: 62, height: 4, ascending: true },
        { start: 75, height: 3, ascending: false },
        { start: 96, height: 6, ascending: true },
        { start: 112, height: 4, ascending: false },
        { start: 132, height: 5, ascending: true },
        { start: 145, height: 4, ascending: false },
        { start: 168, height: 5, ascending: true },
        { start: 190, height: 8, ascending: true }
      ],
      pipes: [
        { col: 30, height: 2 },
        { col: 52, height: 3 },
        { col: 78, height: 2 },
        { col: 110, height: 4 },
        { col: 142, height: 3 },
        { col: 175, height: 2 }
      ],
      enemies: [
        { col: 8, row: 13 },
        { col: 14, row: 9 },
        { col: 22, row: 13 },
        { col: 38, row: 13 },
        { col: 48, row: 7 },
        { col: 50, row: 7 },
        { col: 65, row: 13 },
        { col: 72, row: 13 },
        { col: 82, row: 8 },
        { col: 88, row: 13 },
        { col: 102, row: 7 },
        { col: 108, row: 7 },
        { col: 118, row: 13 },
        { col: 122, row: 13 },
        { col: 138, row: 8 },
        { col: 152, row: 7 },
        { col: 158, row: 7 },
        { col: 172, row: 13 },
        { col: 178, row: 13 },
        { col: 184, row: 8 }
      ],
      coins: [
        { col: 11, row: 8 },
        { col: 12, row: 8 },
        { col: 13, row: 8 },
        { col: 17, row: 7 },
        { col: 18, row: 7 },
        { col: 34, row: 8 },
        { col: 35, row: 8 },
        { col: 46, row: 6 },
        { col: 48, row: 6 },
        { col: 50, row: 6 },
        { col: 69, row: 8 },
        { col: 70, row: 8 },
        { col: 81, row: 7 },
        { col: 83, row: 7 },
        { col: 85, row: 7 },
        { col: 101, row: 6 },
        { col: 103, row: 6 },
        { col: 105, row: 6 },
        { col: 116, row: 8 },
        { col: 118, row: 8 },
        { col: 136, row: 7 },
        { col: 138, row: 7 },
        { col: 140, row: 7 },
        { col: 151, row: 6 },
        { col: 153, row: 6 },
        { col: 155, row: 6 },
        { col: 171, row: 8 },
        { col: 173, row: 8 },
        { col: 175, row: 8 },
        { col: 183, row: 7 },
        { col: 185, row: 7 }
      ],
      checkpoints: [
        { col: 60, row: 13 },
        { col: 120, row: 13 },
        { col: 170, row: 13 }
      ],
      flag: { col: 195, row: 13 }
    };
  }
};

export default level5;
