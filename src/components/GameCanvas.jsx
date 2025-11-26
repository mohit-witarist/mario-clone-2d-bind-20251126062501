import React, { useEffect, useRef, useState, useCallback } from 'react';
import GameEngine from '../game/GameEngine';
import useGameLoop from '../hooks/useGameLoop';
import GameUI from './GameUI';
import { GAME_STATES } from '../game/constants';

function GameCanvas() {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const [gameData, setGameData] = useState({
    state: GAME_STATES.START,
    score: 0,
    coins: 0,
    lives: 3,
    time: 300,
    playerState: 'small'
  });
  
  useEffect(() => {
    if (canvasRef.current && !gameRef.current) {
      gameRef.current = new GameEngine(canvasRef.current);
      gameRef.current.onStateChange = (data) => {
        setGameData(data);
      };
      setGameData(gameRef.current.getState());
    }
    
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy();
      }
    };
  }, []);
  
  const gameLoop = useCallback((time) => {
    if (gameRef.current) {
      gameRef.current.update(time);
      gameRef.current.render();
    }
  }, []);
  
  useGameLoop(gameLoop, true);
  
  const handleStart = useCallback(() => {
    if (gameRef.current) {
      gameRef.current.start();
    }
  }, []);
  
  const handleRestart = useCallback(() => {
    if (gameRef.current) {
      gameRef.current.restart();
    }
  }, []);
  
  const handleRespawn = useCallback(() => {
    if (gameRef.current) {
      gameRef.current.respawn();
    }
  }, []);
  
  return (
    <div className="game-wrapper">
      <canvas ref={canvasRef} />
      <GameUI
        gameState={gameData.state}
        score={gameData.score}
        coins={gameData.coins}
        lives={gameData.lives}
        time={gameData.time}
        playerState={gameData.playerState}
        onStart={handleStart}
        onRestart={handleRestart}
        onRespawn={handleRespawn}
      />
    </div>
  );
}

export default GameCanvas;
