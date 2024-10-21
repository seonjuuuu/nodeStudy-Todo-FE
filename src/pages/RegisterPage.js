import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import styles from './RegisterPage.module.scss';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const repasswordRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validation()) {
      return;
    }
    try {
      const params = { email, name, password };
      const res = await api.post('/user', params);
      if (res.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.error('error');
      if (error.message) {
        alert(error.message);
        return;
      }
      alert('회원가입에 실패하였습니다.');
    }
  };

  const validation = () => {
    if (!name) {
      alert('이름을 입력해 주세요');
      nameRef.current.focus();
      return false;
    }
    if (name.length < 3 || name.length > 11) {
      alert('이름은 최소 3글자 ~ 최대 11글자입니다.\n글자수를 확인해주세요.');
      nameRef.current.focus();
      return false;
    }
    if (!email) {
      alert('이메일을 입력해 주세요');
      emailRef.current.focus();
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('이메일 형식에 맞지 않습니다.');
      emailRef.current.focus();
      return false;
    }
    if (!password) {
      alert('비밀번호를 입력해 주세요');
      passwordRef.current.focus();
      return false;
    }
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('비밀번호는 숫자,대문자,특수문자 포함 최소 8자 이상이어야 합니다.');
      passwordRef.current.focus();
      return false;
    }
    if (!repassword) {
      alert('비밀번호 확인을 입력해 주세요.');
      repasswordRef.current.focus();
      return false;
    }
    if (password !== repassword) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해 주세요.');
      repasswordRef.current.focus();
      return false;
    }
    return true;
  };

  return (
    <div className={styles.container}>
      <img src="/logo-2.png" alt="logo" className={styles.logo} />
      <form className={styles.loginBox} onSubmit={handleSubmit}>
        <h2>회원가입</h2>
        <div className={styles.formGroup}>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            placeholder="이름입력(3~11자)"
            onChange={(event) => setName(event.target.value)}
            ref={nameRef}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력해 주세요"
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
            placeholder="숫자,대문자,특수문자 포함 최소 8자이상"
            onChange={(event) => setPassword(event.target.value)}
            ref={passwordRef}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="repassword">비밀번호 확인</label>
          <input
            type="password"
            id="repassword"
            placeholder="숫자,대문자,특수문자 포함 최소 8자이상"
            onChange={(event) => setRepassword(event.target.value)}
            ref={repasswordRef}
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.primaryButton}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
