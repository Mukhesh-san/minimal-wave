
import React, { useState, useEffect, useRef } from 'react';

const MinionEyeTrackerApp: React.FC = () => {
  const [eyePosition, setEyePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      // Calculate the center of the minion container
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate the angle between the mouse position and the center
      const angleRad = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      
      // Convert angle to eye position with limited movement range
      const maxMovement = 20; // Maximum pixel movement
      const moveX = Math.cos(angleRad) * maxMovement;
      const moveY = Math.sin(angleRad) * maxMovement;
      
      // Update eye position (center position + calculated movement)
      setEyePosition({
        x: 50 + moveX,
        y: 50 + moveY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full border border-border rounded-lg shadow-sm bg-card p-6 mx-auto">
      <div 
        ref={containerRef}
        className="w-full max-w-[200px] h-[200px] mx-auto bg-yellow-400 rounded-full flex items-center justify-center relative overflow-hidden"
        style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
      >
        {/* Goggles strap */}
        <div className="absolute w-[220px] h-[35px] bg-gray-800 top-[40px] z-10"></div>
        
        {/* Left eye */}
        <div className="absolute w-[70px] h-[70px] bg-white rounded-full left-[25px] top-[50px] z-20 flex items-center justify-center">
          <div 
            className="w-[35px] h-[35px] bg-amber-800 rounded-full"
            style={{
              position: 'relative',
              left: `${eyePosition.x - 50}%`,
              top: `${eyePosition.y - 50}%`,
            }}
          >
            <div className="w-[15px] h-[15px] bg-black rounded-full absolute top-[10px] left-[10px]"></div>
          </div>
        </div>
        
        {/* Right eye */}
        <div className="absolute w-[70px] h-[70px] bg-white rounded-full right-[25px] top-[50px] z-20 flex items-center justify-center">
          <div 
            className="w-[35px] h-[35px] bg-amber-800 rounded-full"
            style={{
              position: 'relative',
              left: `${eyePosition.x - 50}%`,
              top: `${eyePosition.y - 50}%`,
            }}
          >
            <div className="w-[15px] h-[15px] bg-black rounded-full absolute top-[10px] left-[10px]"></div>
          </div>
        </div>
        
        {/* Mouth */}
        <div className="absolute w-[80px] h-[40px] bg-gray-700 bottom-[40px] rounded-b-full z-20 overflow-hidden">
          <div className="w-full h-[20px] bg-pink-300 absolute bottom-0 flex justify-center items-end">
            {/* Teeth */}
            <div className="w-[15px] h-[15px] bg-white mx-1 rounded-b-sm"></div>
            <div className="w-[15px] h-[15px] bg-white mx-1 rounded-b-sm"></div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-center mt-4 text-muted-foreground">
        Move your cursor around to control the minion's eyes!
      </p>
    </div>
  );
};

export default MinionEyeTrackerApp;
