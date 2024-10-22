import React from 'react';
import styles from './ProgressBar.module.scss';

const ProgressBar = ({ progress }) => {
  return (
    <div className={styles.progress}>
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progress}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <img
        src="/pencil.png"
        alt="walker"
        className={styles.character}
        style={{ left: `calc(${progress}% - 10px)` }}
      />
    </div>
  );
};

export default ProgressBar;
