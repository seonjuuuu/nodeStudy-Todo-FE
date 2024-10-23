import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    sessionStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <img src="/logo-2.png" alt="logo" className={styles.logoImg} />
      <button className={styles.loginBtn} onClick={handleLogin}>
        로그아웃
      </button>
    </header>
  );
};

export default Header;
