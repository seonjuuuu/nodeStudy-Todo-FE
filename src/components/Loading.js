import React from 'react';
import { PropagateLoader } from 'react-spinners';
import styles from './Loading.module.scss';

const Loading = ({ isLoading = true }) => {
  return (
    <>
      <p>잠시만 기다려주세요</p>
      <div className={styles.loading}>
        <PropagateLoader color="#8f8f8f" loading={isLoading} />
      </div>
    </>
  );
};

export default Loading;
