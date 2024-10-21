import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import styles from './RegisterPage.module.scss';
import Loading from '../components/Loading';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isValidField, setIsValidField] = useState({});

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
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const validateField = (field, value) => {
    const newErrors = { ...errors };
    const newValidFields = { ...isValidField };

    if (field === 'name') {
      if (!value) {
        newErrors.name = '이름을 입력해 주세요';
      } else if (value.length < 3 || value.length > 11) {
        newErrors.name = '이름은 최소 3글자 ~ 최대 11글자입니다.';
      } else {
        delete newErrors.name;
        newValidFields.name = true;
      }
    } else if (field === 'email') {
      if (!value) {
        newErrors.email = '이메일을 입력해 주세요';
      } else {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          newErrors.email = '이메일 형식에 맞지 않습니다.';
        } else {
          delete newErrors.email;
          newValidFields.email = true;
        }
      }
    } else if (field === 'password') {
      if (!value) {
        newErrors.password = '비밀번호를 입력해 주세요';
      } else {
        const passwordRegex =
          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(value)) {
          newErrors.password =
            '비밀번호는 숫자,대문자,특수문자 포함 최소 8자 이상이어야 합니다.';
        } else {
          delete newErrors.password;
          newValidFields.password = true;
        }
      }
    } else if (field === 'repassword') {
      if (!value) {
        newErrors.repassword = '비밀번호 확인을 입력해 주세요.';
      } else if (value !== password) {
        newErrors.repassword =
          '비밀번호가 일치하지 않습니다. 다시 확인해 주세요.';
      } else {
        delete newErrors.repassword;
        newValidFields.repassword = true;
      }
    }
    setErrors(newErrors);
    setIsValidField(newValidFields);
  };

  const validation = () => {
    validateField('name', name);
    validateField('email', email);
    validateField('password', password);
    validateField('repassword', repassword);
    return Object.keys(errors).length === 0;
  };

  const handleBlur = (field, value) => {
    validateField(field, value);
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <img src="/logo-2.png" alt="logo" className={styles.logo} />
          <div className={styles.loginWrapper}>
            <form className={styles.loginBox} onSubmit={handleSubmit}>
              <h2>회원가입</h2>
              <div className={styles.formGroup}>
                <label htmlFor="name">이름</label>
                <input
                  type="text"
                  id="name"
                  placeholder="이름입력(3~11자)"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  onBlur={() => handleBlur('name', name)}
                  ref={nameRef}
                  className={`${styles.input} ${
                    isValidField.name ? styles.valid : ''
                  }`}
                />
                {errors.name && (
                  <span className={styles.error}>{errors.name}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  placeholder="이메일을 입력해 주세요"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onBlur={() => handleBlur('email', email)}
                  ref={emailRef}
                  className={`${styles.input} ${
                    isValidField.email ? styles.valid : ''
                  }`}
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  placeholder="숫자,대문자,특수문자 포함 최소 8자이상"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  onBlur={() => handleBlur('password', password)}
                  ref={passwordRef}
                  className={`${styles.input} ${
                    isValidField.password ? styles.valid : ''
                  }`}
                />
                {errors.password && (
                  <span className={styles.error}>{errors.password}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="repassword">비밀번호 확인</label>
                <input
                  type="password"
                  id="repassword"
                  placeholder="숫자,대문자,특수문자 포함 최소 8자이상"
                  value={repassword}
                  onChange={(event) => setRepassword(event.target.value)}
                  onBlur={() => handleBlur('repassword', repassword)}
                  ref={repasswordRef}
                  className={`${styles.input} ${
                    isValidField.repassword ? styles.valid : ''
                  }`}
                />
                {errors.repassword && (
                  <span className={styles.error}>{errors.repassword}</span>
                )}
              </div>

              <button type="submit" className={styles.primaryButton}>
                회원가입
              </button>
              <span className={styles.link}>
                이미 회원이신가요? <Link to="/login"> 로그인 하기</Link>
              </span>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default RegisterPage;
