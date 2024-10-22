import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/');
  };
  return (
    <header className={styles.header}>
      <img src="/logo-2.png" alt="logo" className={styles.logoImg} />
      <button className={styles.loginBtn} onClick={handleLogin}>
        로그인
      </button>
    </header>
  );
};

export default Header;
