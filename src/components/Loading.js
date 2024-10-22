import React from 'react';
import { PropagateLoader } from 'react-spinners';
import styles from './Loading.module.scss';

const Loading = ({ isLoading = true }) => {
  return (
    <div className={styles.loadingBox}>
      <p className={styles.text}>잠시만 기다려주세요</p>
      <div className={styles.loading}>
        <PropagateLoader color="#8f8f8f" loading={isLoading} />
      </div>
    </div>
  );
};

export default Loading;
