import React, { useState, useEffect } from 'react';

const FilterWebsite = () => {
  const [filterPosition, setFilterPosition] = useState(-100);

  useEffect(() => {
    const animateFilter = () => {
      setFilterPosition((prevPosition) => {
        if (prevPosition >= 100) return -100;
        return prevPosition + 0.5;
      });
    };

    const animationId = setInterval(animateFilter, 20);
    return () => clearInterval(animationId);
  }, []);

  return (
    <div style={styles.container}>
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
        <div style={{...styles.text, ...styles.top}}>Chigga</div>
        <div style={{...styles.text, ...styles.right}}>Hafl Nigga</div>
        <div style={{...styles.text, ...styles.bottom}}>Half Asian</div>
        <div style={{...styles.text, ...styles.left}}>Chigga</div>
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
  },
  imageContainer: {
    width: '80%',
    height: '80%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'relative',
    zIndex: 1,
  },
  yellowFilter: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 0, 0.5)',
    zIndex: 0,
  },
  text: {
    position: 'absolute',
    fontSize: '24px',
    fontWeight: 'bold',
    zIndex: 2,
  },
  top: {
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  right: {
    top: '50%',
    right: '20px',
    transform: 'translateY(-50%)',
  },
  bottom: {
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  left: {
    top: '50%',
    left: '20px',
    transform: 'translateY(-50%)',
  },
};

export default FilterWebsite;