import React, { useState, useEffect, useRef } from 'react';

const PaintBrush = ({ position }) => (
  <div style={{
    position: 'fixed',
    width: '30px',
    height: '30px',
    background: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIwLjcxIDQuMDRjLS4zOS0uMzktMS4wMi0uMzktMS40MSAwTDEyLjA3IDExLjI1IDEwLjU0IDkuNzFsNy4xOC03LjE4YzEuOTUtMS45NSA1LjEyLTEuOTUgNy4wNyAwczEuOTUgNS4xMiAwIDcuMDdsLTcuMTggNy4xOC0xLjUzLTEuNTMgNy4wNy03LjA3Yy4zOS0uMzkuMzktMS4wMiAwLTEuNDFMMjAuNzEgNC4wNHoiIGZpbGw9IiNGRkQxMDAiLz48cGF0aCBkPSJNMTIuMDcgMTEuMjUgMTYgMTUuMTggMTEuMjUgMTlsLTMuOTMtMy45MyAzLjkzLTMuOTN6TTcuMTEgMTkuNjQgMy43NSAxNi4yOWMtLjc4LS43OC0uNzgtMi4wNSAwLTIuODNsMS40MS0xLjQxIDMuOTMgMy45My0xLjQxIDEuNDFjLS4zOS4zOS0uMzkgMS4wMiAwIDEuNDFsLjU3LjU3TDcuMTEgMTkuNjR6IiBmaWxsPSIjRkZEMTAwIi8+PC9zdmc+) center/contain no-repeat',
    left: position.x - 15,
    top: position.y - 15,
    transform: 'rotate(-45deg)',
    pointerEvents: 'none',
    zIndex: 10,
  }} />
);

const FilterWebsite = () => {
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [brushPosition, setBrushPosition] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const [, forceUpdate] = useState();

  useEffect(() => {
    if (isDrawingMode) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [isDrawingMode]);

  const handleMouseMove = (e) => {
    setBrushPosition({ x: e.clientX, y: e.clientY });

    if (isDrawing && isDrawingMode) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = 'yellow';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    if (isDrawingMode) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (isDrawingMode) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
    }
  };

  const toggleDrawingMode = () => {
    setIsDrawingMode(!isDrawingMode);
    forceUpdate({});
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'my_chi_drawing.png';
    link.click();
  };

  return (
    <div style={styles.container} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      {isDrawingMode ? (
        <div style={styles.drawingContainer}>
          <canvas ref={canvasRef} style={styles.canvas} width={window.innerWidth * 0.8} height={window.innerHeight * 0.8} />
          <div style={styles.drawingText}>Draw your Chigger</div>
          <div style={styles.buttonContainer}>
            <button onClick={clearCanvas} style={styles.button}>Clear</button>
            <button onClick={downloadDrawing} style={styles.button}>Download</button>
            <button onClick={toggleDrawingMode} style={styles.button}>Back to Image</button>
          </div>
        </div>
      ) : (
        <div style={styles.imageContainer}>
          <img src="./chigga.png" alt="Centered Image" style={styles.image} />
          <div style={styles.textOverlay}>
            <div style={styles.text}>Chigga</div>
            <div style={styles.text}>Half N-word</div>
            <div style={styles.text}>Half Asian</div>
          </div>
          <button onClick={toggleDrawingMode} style={styles.button}>Draw your "chi"</button>
        </div>
      )}
      <PaintBrush position={brushPosition} />
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: '80%',
    height: '80%',
    boxShadow: '0 0 20px rgba(255, 255, 0, 0.5)',
  },
  drawingContainer: {
    position: 'relative',
    width: '80%',
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  canvas: {
    border: '2px solid yellow',
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
  drawingText: {
    color: 'yellow',
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: 'yellow',
    color: 'black',
    border: 'none',
    cursor: 'pointer',
    zIndex: 11,
  },
};

export default FilterWebsite;