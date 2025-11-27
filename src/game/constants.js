export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 480;
export const TILE_SIZE = 32;
export const GRAVITY = 0.55;
export const MAX_FALL_SPEED = 12;
export const PLAYER_SPEED = 5;
export const PLAYER_RUN_SPEED = 7;
export const PLAYER_JUMP_FORCE = -13;
export const PLAYER_JUMP_FORCE_MIN = -7;
export const PLAYER_ACCELERATION = 0.4;
export const PLAYER_RUN_ACCELERATION = 0.6;
export const PLAYER_FRICTION = 0.88;
export const PLAYER_AIR_FRICTION = 0.95;
export const ENEMY_SPEED = 1.2;
export const FIREBALL_SPEED = 7;
export const FIREBALL_COOLDOWN = 300;
export const LEVEL_TIME = 300;

export const COLORS = {
  SKY: '#5c94fc',
  GROUND: '#8b4513',
  BRICK: '#c84c0c',
  QUESTION_BLOCK: '#ffd700',
  QUESTION_BLOCK_EMPTY: '#8b4513',
  PIPE: '#00a800',
  PLAYER_SMALL: '#e52521',
  PLAYER_BIG: '#e52521',
  PLAYER_FIRE: '#fff',
  GOOMBA: '#8b4513',
  COIN: '#ffd700',
  MUSHROOM: '#ff6b6b',
  FIRE_FLOWER: '#ff4500',
  FIREBALL: '#ff8c00'
};

export const BLOCK_TYPES = {
  EMPTY: 0,
  GROUND: 1,
  BRICK: 2,
  QUESTION_COIN: 3,
  QUESTION_MUSHROOM: 4,
  QUESTION_FIRE: 5,
  QUESTION_EMPTY: 6,
  PIPE_TOP_LEFT: 7,
  PIPE_TOP_RIGHT: 8,
  PIPE_BODY_LEFT: 9,
  PIPE_BODY_RIGHT: 10,
  HARD_BLOCK: 11
};

export const ENTITY_TYPES = {
  GOOMBA: 'goomba',
  COIN: 'coin',
  MUSHROOM: 'mushroom',
  FIRE_FLOWER: 'fire_flower',
  FIREBALL: 'fireball'
};

export const PLAYER_STATES = {
  SMALL: 'small',
  BIG: 'big',
  FIRE: 'fire'
};

export const GAME_STATES = {
  START: 'start',
  PLAYING: 'playing',
  DEAD: 'dead',
  DYING: 'dying',
  GAME_OVER: 'game_over',
  WIN: 'win',
  LEVEL_COMPLETE: 'level_complete',
  TRANSITIONING: 'transitioning'
};
