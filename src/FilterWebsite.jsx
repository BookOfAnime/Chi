import React, { useState, useEffect, useRef } from 'react';

const PaintBrush = ({ position, isActive }) => (
  <div style={{
    position: 'absolute',
    width: '50px',
    height: '50px',
    background: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIwLjcxIDQuMDRjLS4zOS0uMzktMS4wMi0uMzktMS40MSAwTDEyLjA3IDExLjI1IDEwLjU0IDkuNzFsNy4xOC03LjE4YzEuOTUtMS45NSA1LjEyLTEuOTUgNy4wNyAwczEuOTUgNS4xMiAwIDcuMDdsLTcuMTggNy4xOC0xLjUzLTEuNTMgNy4wNy03LjA3Yy4zOS0uMzkuMzktMS4wMiAwLTEuNDFMMjAuNzEgNC4wNHoiIGZpbGw9IiNGRkQxMDAiLz48cGF0aCBkPSJNMTIuMDcgMTEuMjUgMTYgMTUuMTggMTEuMjUgMTlsLTMuOTMtMy45MyAzLjkzLTMuOTN6TTcuMTEgMTkuNjQgMy43NSAxNi4yOWMtLjc4LS43OC0uNzgtMi4wNSAwLTIuODNsMS40MS0xLjQxIDMuOTMgMy45My0xLjQxIDEuNDFjLS4zOS4zOS0uMzkgMS4wMiAwIDEuNDFsLjU3LjU3TDcuMTEgMTkuNjR6IiBmaWxsPSIjRkZEMTAwIi8+PC9zdmc+) center/contain no-repeat',
    left: position.x - 25,
    top: position.y - 25,
    transform: 'rotate(-45deg)',
    opacity: isActive ? 1 : 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
    zIndex: 10,
  }} />
);

const FilterWebsite = () => {
  const [paintedAreas, setPaintedAreas] = useState([]);
  const [brushPosition, setBrushPosition] = useState({ x: 0, y: 0 });
  const [isBrushActive, setIsBrushActive] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'yellow';

    paintedAreas.forEach(area => {
      ctx.beginPath();
      ctx.arc(area.x, area.y, 30, 0, 2 * Math.PI);
      ctx.fill();
    });
  }, [paintedAreas]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setBrushPosition({ x, y });

    if (isBrushActive) {
      setPaintedAreas(prev => [...prev, { x, y }]);
    }
  };

  return (
    <div style={styles.container} onMouseMove={handleMouseMove} onMouseDown={() => setIsBrushActive(true)} onMouseUp={() => setIsBrushActive(false)} onMouseLeave={() => setIsBrushActive(false)}>
      <canvas ref={canvasRef} style={styles.canvas} width={window.innerWidth} height={window.innerHeight} />
      <div style={styles.imageContainer}>
        <img src="./chigga.png" alt="Centered Image" style={styles.image} />
        <div style={styles.textOverlay}>
          <div style={styles.text}>Chigger</div>
          <div style={styles.text}>Half N-word</div>
          <div style={styles.text}>Half Asian</div>
        </div>
      </div>
      <PaintBrush position={brushPosition} isActive={isBrushActive} />
    </div>
  );
};

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'black',
    cursor: 'none',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  imageContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '60%',
    zIndex: 2,
    boxShadow: '0 0 20px rgba(255, 255, 0, 0.5)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px',
    background: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
  },
};

export default FilterWebsite;