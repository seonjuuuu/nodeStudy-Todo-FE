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
      <div className={styles.right}>
        <div>
          👋
          <span className={styles.name}>{user.name}</span>님
        </div>
        <button className={styles.loginBtn} onClick={handleLogin}>
          로그아웃
        </button>
      </div>
    </header>
  );
};

export default Header;
