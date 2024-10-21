import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <img src="/logo-2.png" alt="logo" className={styles.logoImg} />
      <button className={styles.loginBtn}>로그인</button>
    </header>
  );
};

export default Header;
