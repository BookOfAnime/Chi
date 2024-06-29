import React, { useState, useEffect } from 'react';

const Particle = ({ color }) => (
  <div style={{
    position: 'absolute',
    width: '5px',
    height: '5px',
    backgroundColor: color,
    borderRadius: '50%',
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animation: `float ${Math.random() * 5 + 5}s linear infinite`,
  }} />
);

const FilterWebsite = () => {
  const [filterPosition, setFilterPosition] = useState(-100);
  const [bgColor, setBgColor] = useState(0);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const animateFilter = () => {
      setFilterPosition((prevPosition) =>
        prevPosition >= 100 ? -100 : prevPosition + 0.5
      );
    };

    const animateBg = () => {
      setBgColor((prevColor) => (prevColor + 1) % 200);
    };

    const filterAnimationId = setInterval(animateFilter, 20);
    const bgAnimationId = setInterval(animateBg, 50);

    setParticles(Array(20).fill().map((_, i) => <Particle key={i} color={i % 2 === 0 ? 'yellow' : 'black'} />));

    return () => {
      clearInterval(filterAnimationId);
      clearInterval(bgAnimationId);
    };
  }, []);

  const getBgColor = () => {
    if (bgColor < 100) {
      return `rgb(${255 * bgColor / 100}, ${255 * bgColor / 100}, 0)`;
    } else {
      const blackness = (bgColor - 100) / 100;
      return `rgb(${255 * (1 - blackness)}, ${255 * (1 - blackness)}, 0)`;
    }
  };

  return (
    <div style={{...styles.container, backgroundColor: getBgColor()}}>
      {particles}
      <div style={styles.imageContainer}>
        <div
          style={{
            ...styles.yellowFilter,
            left: `${filterPosition}%`,
          }}
        />
        <img
          src="./chigga.png"
          alt="Centered Image"
          style={styles.image}
        />
        <div style={{...styles.text, ...styles.top, animation: 'pulse 2s infinite'}}>Chigger</div>
        <div style={{...styles.text, ...styles.right, animation: 'slide-in 1s ease-out'}}>Half Nigga</div>
        <div style={{...styles.text, ...styles.bottom, animation: 'pulse 2s infinite 1s'}}>Half Asian</div>
        <div style={{...styles.text, ...styles.left, animation: 'slide-in 1s ease-out 0.5s'}}>Chigger</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    transition: 'background-color 0.5s ease',
  },
  imageContainer: {
    width: '80%',
    height: '80%',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
    borderRadius: '10px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'relative',
    zIndex: 1,
    transition: 'transform 0.3s ease',
    ':hover': {
      transform: 'scale(1.05)',
    },
  },
  yellowFilter: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, rgba(255, 255, 0, 0.3), rgba(255, 255, 0, 0.5))',
    zIndex: 0,
    mixBlendMode: 'overlay',
  },
  text: {
    position: 'absolute',
    fontWeight: 'bold',
    zIndex: 2,
    color: 'white',
    textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
  },
  top: {
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '48px',
  },
  right: {
    top: '50%',
    right: '20px',
    transform: 'translateY(-50%) rotate(90deg)',
    fontSize: '24px',
  },
  bottom: {
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '48px',
  },
  left: {
    top: '50%',
    left: '20px',
    transform: 'translateY(-50%) rotate(-90deg)',
    fontSize: '24px',
  },
  '@keyframes pulse': {
    '0%, 100%': { opacity: 1, transform: 'scale(1)' },
    '50%': { opacity: 0.8, transform: 'scale(1.1)' },
  },
  '@keyframes slide-in': {
    from: { opacity: 0, transform: 'translateX(-50px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  },
  '@keyframes float': {
    '0%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' },
    '100%': { transform: 'translateY(0px)' },
  },
};

export default FilterWebsite;