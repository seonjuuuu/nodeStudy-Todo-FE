import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

import styles from './LoginPage.module.scss';
import Loading from '../components/Loading';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      alert('이메일 입력은 필수입니다');
      emailRef.current.focus();
      return;
    }
    if (!password) {
      alert('비밀번호를 입력해주세요.');
      passwordRef.current.focus();
      return;
    }
    setIsLoading(true);

    try {
      const params = {
        email,
        password,
      };
      const res = await api.post('/user/login', params);
      if (res.status === 200) {
        setUser(res.data.user);
        sessionStorage.setItem('token', res.data.token);
        api.defaults.headers['authorization'] = 'Bearer ' + res.data.token;
        navigate('/home');
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1 className={styles.logo}>
            <img src="/logo-2.png" alt="logo" className={styles.logoImg} />
          </h1>
          <div className={styles.loginWrapper}>
            {error && <div className={styles.error}>🚨 {error}</div>}
            <form className={styles.loginBox} onSubmit={handleSubmit}>
              <h2>LOGIN</h2>
              <div className={styles.formGroup}>
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  placeholder="이메일을 입력해주세요"
                  onChange={(event) => setEmail(event.target.value)}
                  ref={emailRef}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  placeholder="비밀번호를 입력해주세요"
                  onChange={(event) => setPassword(event.target.value)}
                  ref={passwordRef}
                  className={styles.input}
                />
              </div>
              <div className={styles.buttonBox}>
                <button type="submit" className={styles.primaryButton}>
                  LOGIN
                </button>
                <span className={styles.link}>
                  계정이 없다면? <Link to="/register">회원가입 하기</Link>
                </span>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginPage;
