
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const GRID_SIZE = 15;
const CELL_SIZE = 20;
const INITIAL_SPEED = 200; // Reduced speed (increased delay)

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const SnakeGameApp: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 5, y: 5 }]);
  const [food, setFood] = useState<Position>({ x: 10, y: 10 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | null>(null);

  const placeFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    setFood(newFood);
  };

  const resetGame = () => {
    setSnake([{ x: 5, y: 5 }]);
    setDirection('RIGHT');
    setIsGameOver(false);
    setScore(0);
    placeFood();
    setIsPaused(true);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // Prevent opposite directions
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ':
          togglePause();
          break;
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [direction, isPaused]);

  // Game loop
  useEffect(() => {
    if (isPaused || isGameOver) {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    let lastTime = 0;
    const gameLoop = (timestamp: number) => {
      if (!lastTime || timestamp - lastTime >= INITIAL_SPEED) {
        lastTime = timestamp;
        
        // Move snake
        const head = { ...snake[0] };
        
        switch (direction) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }

        // Check boundaries
        if (
          head.x < 0 || 
          head.x >= GRID_SIZE || 
          head.y < 0 || 
          head.y >= GRID_SIZE ||
          snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
        ) {
          setIsGameOver(true);
          toast({
            title: "Game Over!",
            description: `Your score: ${score}`,
          });
          return;
        }

        const newSnake = [head, ...snake];
        
        // Check if food eaten
        if (head.x === food.x && head.y === food.y) {
          setScore(prevScore => prevScore + 1);
          placeFood();
        } else {
          newSnake.pop();
        }
        
        setSnake(newSnake);
      }
      
      // Draw game
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Clear canvas
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw snake
          ctx.fillStyle = '#0f172a';
          snake.forEach(segment => {
            ctx.fillRect(
              segment.x * CELL_SIZE, 
              segment.y * CELL_SIZE, 
              CELL_SIZE, 
              CELL_SIZE
            );
          });
          
          // Draw food
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(
            food.x * CELL_SIZE, 
            food.y * CELL_SIZE, 
            CELL_SIZE, 
            CELL_SIZE
          );
        }
      }
      
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [snake, food, direction, isPaused, isGameOver, score]);

  return (
    <div className="border border-border rounded-lg shadow-sm bg-card p-4 flex flex-col items-center">
      <div className="mb-2 flex justify-between w-full px-2">
        <div className="text-sm font-medium">Score: {score}</div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant={isPaused ? "outline" : "secondary"} 
            onClick={togglePause}
            disabled={isGameOver}
          >
            {isPaused ? "Start" : "Pause"}
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={resetGame}
          >
            Reset
          </Button>
        </div>
      </div>
      
      <canvas 
        ref={canvasRef}
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
        className="border border-border"
      />
      
      {isPaused && !isGameOver && (
        <div className="mt-2 text-sm text-muted-foreground">
          Press Start or Space to play. Use arrow keys to move.
        </div>
      )}
      
      {isGameOver && (
        <div className="mt-2 text-sm text-destructive">
          Game Over! Press Reset to play again.
        </div>
      )}
    </div>
  );
};

export default SnakeGameApp;
