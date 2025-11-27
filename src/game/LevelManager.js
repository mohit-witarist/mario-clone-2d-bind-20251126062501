import levels from './levels';
import { TILE_SIZE, CANVAS_HEIGHT } from './constants';

class LevelManager {
  constructor() {
    this.currentLevelIndex = 0;
    this.levels = levels;
    
    this.checkpoint = null;
    this.savedState = null;
    
    this.transitioning = false;
    this.transitionAlpha = 0;
    this.transitionPhase = 'none';
    this.transitionCallback = null;
  }
  
  getCurrentLevel() {
    return this.levels[this.currentLevelIndex];
  }
  
  getCurrentLevelNumber() {
    return this.currentLevelIndex + 1;
  }
  
  getTotalLevels() {
    return this.levels.length;
  }
  
  getLevelName() {
    const level = this.getCurrentLevel();
    return level ? level.name : 'Unknown';
  }
  
  getTimeLimit() {
    const level = this.getCurrentLevel();
    return level ? level.timeLimit : 300;
  }
  
  getPlayerStart() {
    const level = this.getCurrentLevel();
    if (level) {
      return { 
        x: level.playerStart.x, 
        y: level.playerStart.y 
      };
    }
    return { x: 64, y: CANVAS_HEIGHT - TILE_SIZE * 3 };
  }
  
  saveCheckpoint(playerX, playerY, playerState, score, coins) {
    this.checkpoint = {
      x: playerX,
      y: playerY
    };
    this.savedState = {
      playerState: playerState,
      score: score,
      coins: coins
    };
  }
  
  hasCheckpoint() {
    return this.checkpoint !== null;
  }
  
  getCheckpointPosition() {
    if (this.checkpoint) {
      return { x: this.checkpoint.x, y: this.checkpoint.y };
    }
    return this.getPlayerStart();
  }
  
  getSavedState() {
    return this.savedState;
  }
  
  clearCheckpoint() {
    this.checkpoint = null;
    this.savedState = null;
  }
  
  canAdvance() {
    return this.currentLevelIndex < this.levels.length - 1;
  }
  
  advanceLevel() {
    if (this.canAdvance()) {
      this.currentLevelIndex++;
      this.clearCheckpoint();
      return true;
    }
    return false;
  }
  
  resetToLevel(levelIndex) {
    if (levelIndex >= 0 && levelIndex < this.levels.length) {
      this.currentLevelIndex = levelIndex;
      this.clearCheckpoint();
    }
  }
  
  resetGame() {
    this.currentLevelIndex = 0;
    this.clearCheckpoint();
  }
  
  startTransition(callback) {
    this.transitioning = true;
    this.transitionAlpha = 0;
    this.transitionPhase = 'fadeOut';
    this.transitionCallback = callback;
  }
  
  updateTransition(deltaTime) {
    if (!this.transitioning) return false;
    
    const fadeSpeed = 2;
    
    if (this.transitionPhase === 'fadeOut') {
      this.transitionAlpha += fadeSpeed * deltaTime;
      if (this.transitionAlpha >= 1) {
        this.transitionAlpha = 1;
        this.transitionPhase = 'hold';
        
        if (this.transitionCallback) {
          this.transitionCallback();
          this.transitionCallback = null;
        }
      }
    } else if (this.transitionPhase === 'hold') {
      this.transitionPhase = 'fadeIn';
    } else if (this.transitionPhase === 'fadeIn') {
      this.transitionAlpha -= fadeSpeed * deltaTime;
      if (this.transitionAlpha <= 0) {
        this.transitionAlpha = 0;
        this.transitionPhase = 'none';
        this.transitioning = false;
      }
    }
    
    return this.transitioning;
  }
  
  renderTransition(ctx, width, height) {
    if (this.transitionAlpha > 0) {
      ctx.fillStyle = `rgba(0, 0, 0, ${this.transitionAlpha})`;
      ctx.fillRect(0, 0, width, height);
    }
  }
  
  isTransitioning() {
    return this.transitioning;
  }
}

export default LevelManager;
