import React from 'react';

const styles = {
  container: {
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto 2rem auto',
    padding: '2rem',
    background: 'var(--card)',
    borderRadius: 'var(--radius)',
    boxShadow: '0 1px 6px #0004',
    display: 'block',
  },
  label: {
    fontSize: '1.2rem',
    fontWeight: 600,
    marginBottom: '1rem',
    textAlign: 'center',
    color: 'var(--text)',
    letterSpacing: '.02em',
  },
  barWrapper: {
    position: 'relative',
    width: '100%',
    height: 98,
    marginBottom: '0.5rem',
  },
  barContainer: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '100%',
    height: 38,
    borderRadius: '999px',
    overflow: 'hidden',
    background: '#222',
    boxShadow: '0 1px 6px #0002',
    zIndex: 1,
    display: 'block',
  },
  barFill: {
    height: '100%',
    background: 'linear-gradient(90deg, var(--accent) 0%, #ff4a45 100%)',
    borderRadius: '999px 0 0 999px',
    transition: 'width 0.6s cubic-bezier(.4,0,.2,1)',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  carSticker: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 136,
    height: 136,
    pointerEvents: 'none',
    zIndex: 2,
    transition: 'left 0.6s cubic-bezier(.4,0,.2,1)',
  },
};

const ProgressTracker = ({ percentage = 0 }) => {
  return (
    <div style={styles.container}>
      <div style={styles.label}>
        <span style={{ color: 'var(--accent)' }}>Car Build Progress:</span> {percentage}%
      </div>
      <div style={styles.barWrapper}>
        <div style={styles.barContainer}>
          <div
            style={{ ...styles.barFill, width: `${percentage}%` }}
          />
        </div>
        <img
          src="/images/car_sticker.png"
          alt="Car Sticker"
          style={{
            ...styles.carSticker,
            left: `calc(${percentage}% - 49px)` // 49px is half the car width for centering
          }}
        />
      </div>
    </div>
  );
};

export default ProgressTracker;
