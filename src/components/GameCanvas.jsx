import React, { useEffect, useRef, useState, useCallback } from 'react';
import GameEngine from '../game/GameEngine';
import useGameLoop from '../hooks/useGameLoop';
import GameUI from './GameUI';
import { GAME_STATES } from '../game/constants';

function GameCanvas() {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const containerRef = useRef(null);
  const [gameData, setGameData] = useState({
    state: GAME_STATES.START,
    score: 0,
    coins: 0,
    lives: 3,
    time: 300,
    playerState: 'small',
    levelNumber: 1,
    levelName: 'World 1-1',
    totalLevels: 10
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
        gameRef.current = null;
      }
    };
  }, []);
  
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
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
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);
  
  const handleRestart = useCallback(() => {
    if (gameRef.current) {
      gameRef.current.restart();
    }
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);
  
  const handleRespawn = useCallback(() => {
    if (gameRef.current) {
      gameRef.current.respawn();
    }
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);
  
  const handleContainerClick = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="game-wrapper" 
      tabIndex={0}
      onClick={handleContainerClick}
      style={{ outline: 'none' }}
    >
      <canvas ref={canvasRef} />
      <GameUI
        gameState={gameData.state}
        score={gameData.score}
        coins={gameData.coins}
        lives={gameData.lives}
        time={gameData.time}
        playerState={gameData.playerState}
        levelNumber={gameData.levelNumber}
        levelName={gameData.levelName}
        totalLevels={gameData.totalLevels}
        onStart={handleStart}
        onRestart={handleRestart}
        onRespawn={handleRespawn}
      />
    </div>
  );
}

export default GameCanvas;
