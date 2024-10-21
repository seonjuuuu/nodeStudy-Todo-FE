import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

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
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      if (error.message) {
        alert(error.message);
        return;
      }
      alert('로그인에 실패하였습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>
        <img src="/logo-2.png" alt="logo" className={styles.logo} />
      </h1>
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
  );
};

export default LoginPage;
