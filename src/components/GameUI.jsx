import React from 'react';
import { GAME_STATES, PLAYER_STATES } from '../game/constants';

function GameUI({ gameState, score, coins, lives, time, playerState, onStart, onRestart, onRespawn }) {
  const handleButtonClick = (callback) => (e) => {
    e.stopPropagation();
    callback();
  };

  return (
    <>
      <div className="game-ui">
        <div className="ui-section">
          <span className="ui-label">MARIO</span>
          <span className="ui-value">{String(score).padStart(6, '0')}</span>
        </div>
        
        <div className="ui-section">
          <div className="coins-display">
            <div className="coin-icon"></div>
            <span className="ui-value">x{String(coins).padStart(2, '0')}</span>
          </div>
        </div>
        
        <div className="ui-section">
          <span className="ui-label">WORLD</span>
          <span className="ui-value">1-1</span>
        </div>
        
        <div className="ui-section">
          <span className="ui-label">TIME</span>
          <span className="ui-value">{time}</span>
        </div>
        
        <div className="ui-section">
          <div className="lives-display">
            {[...Array(Math.max(0, lives))].map((_, i) => (
              <div key={i} className="life-icon"></div>
            ))}
          </div>
          {playerState !== PLAYER_STATES.SMALL && (
            <span className={`power-indicator ${playerState === PLAYER_STATES.FIRE ? 'fire' : ''}`}>
              {playerState === PLAYER_STATES.FIRE ? 'FIRE' : 'BIG'}
            </span>
          )}
        </div>
      </div>
      
      {gameState === GAME_STATES.START && (
        <div className="game-overlay">
          <div className="start-screen">
            <h1 className="start-title">SUPER MARIO</h1>
            <p className="start-subtitle">WORLD 1-1</p>
            <button className="restart-btn" onClick={handleButtonClick(onStart)}>
              START GAME
            </button>
            <div className="controls-info">
              <p>ARROWS / WASD - Move</p>
              <p>SPACE / W - Jump</p>
              <p>SHIFT (left) / Z - Run</p>
              <p>SHIFT (right) / X - Fireball</p>
            </div>
          </div>
        </div>
      )}
      
      {gameState === GAME_STATES.DEAD && (
        <div className="game-overlay">
          <h1 className="overlay-title">OOPS!</h1>
          <p className="overlay-score">Lives: {lives}</p>
          <button className="restart-btn" onClick={handleButtonClick(onRespawn)}>
            CONTINUE
          </button>
        </div>
      )}
      
      {gameState === GAME_STATES.GAME_OVER && (
        <div className="game-overlay">
          <h1 className="overlay-title">GAME OVER</h1>
          <p className="overlay-score">Final Score: {score}</p>
          <button className="restart-btn" onClick={handleButtonClick(onRestart)}>
            PLAY AGAIN
          </button>
        </div>
      )}
      
      {gameState === GAME_STATES.WIN && (
        <div className="game-overlay">
          <h1 className="overlay-title" style={{ color: '#ffd700' }}>YOU WIN!</h1>
          <p className="overlay-score">Final Score: {score}</p>
          <p className="overlay-score">Coins: {coins}</p>
          <button className="restart-btn" onClick={handleButtonClick(onRestart)}>
            PLAY AGAIN
          </button>
        </div>
      )}
    </>
  );
}

export default GameUI;
