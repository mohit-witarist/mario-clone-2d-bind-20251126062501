import { useEffect, useRef, useCallback } from 'react';

function useGameLoop(callback, isRunning) {
  const requestRef = useRef();
  const previousTimeRef = useRef();
  
  const animate = useCallback((time) => {
    if (previousTimeRef.current !== undefined) {
      callback(time);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);
  
  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isRunning, animate]);
}

export default useGameLoop;
