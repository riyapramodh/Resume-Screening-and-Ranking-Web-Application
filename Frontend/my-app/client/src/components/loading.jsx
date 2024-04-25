import React, { useState, useEffect } from 'react';
import './BoxLoading.css'
const colors = ['#39414d', '#ff8c00', '#70a1ff', '#10151c']; // Colors for the squares

const Square = ({ color, position, isSwapping }) => {
  const squareStyle = {
    width: "50px", // Reduced size to 50px
    height: "50px", // Reduced size to 50px
    backgroundColor: color,
    margin: "5px", // Reduced gap between squares to 5px
    display: 'inline-block',
    position: 'absolute',
    top: position.y,
    left: position.x,
    transition: 'top 0.5s ease-in-out, left 0.5s ease-in-out',
    transform: isSwapping ? 'scale(1.1)' : 'scale(1)', // Add subtle scale animation during swap
  };

  return <div style={squareStyle} />;
};

const SwappingAnimation = () => {
  const [squares, setSquares] = useState(
    colors.map((color, index) => ({
      color,
      position: { x: index % 2 === 0 ? 0 : 60, y: Math.floor(index / 2) * 70 }, // Adjusted initial positions and gap
    }))
  );
  const [isSwapping, setIsSwapping] = useState(false);

  useEffect(() => {
    const swapInterval = setInterval(() => {
      setIsSwapping(true); // Set swapping flag for animation
      setTimeout(() => {
        const newSquares = [...squares];
        // Swap positions horizontally
        [newSquares[0].position.x, newSquares[1].position.x] = [newSquares[1].position.x, newSquares[0].position.x];
        [newSquares[2].position.x, newSquares[3].position.x] = [newSquares[3].position.x, newSquares[2].position.x];
        // Swap positions vertically
        [newSquares[0].position.y, newSquares[2].position.y] = [newSquares[2].position.y, newSquares[0].position.y];
        [newSquares[1].position.y, newSquares[3].position.y] = [newSquares[3].position.y, newSquares[1].position.y];
        setSquares(newSquares);
        setIsSwapping(false); // Reset swapping flag after animation
      }, 500); // Adjust timeout for animation duration (in milliseconds)
    }, 2000); // Adjust interval between swaps (in milliseconds)

    return () => clearInterval(swapInterval);
  }, []);

  return (
    <div style={{ textAlign: 'center', position: 'absolute', justifyContent : "center" }}>
      {squares.map((square, index) => (
        <Square key={index} {...square} isSwapping={isSwapping} />
      ))}
    </div>
  );
};

export default SwappingAnimation;
