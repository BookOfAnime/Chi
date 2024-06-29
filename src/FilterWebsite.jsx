import React, { useState, useEffect } from 'react';

const FilterWebsite = () => {
  const [filterPosition, setFilterPosition] = useState(-100);
  const [bgColor, setBgColor] = useState(0);

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
        <div style={{...styles.text, ...styles.right}}>Half N-word</div>
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
    transition: 'background-color 0.5s ease',
  },
  imageContainer: {
    width: '80%',
    height: '80%',
    position: 'relative',
    overflow: 'hidden',
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
};

export default FilterWebsite;