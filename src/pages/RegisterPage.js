import React, { useState } from 'react';
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
  const [isValidField, setIsValidField] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState('');

  const navigate = useNavigate();

  // 필드별 검증 함수
  const validateField = (field, value) => {
    const newErrors = { ...errors };
    const newValidFields = { ...isValidField };

    if (field === 'name') {
      if (value.trim() === '') {
        newErrors.name = '이름을 입력해 주세요';
        newValidFields.name = false;
      } else if (value.length < 3 || value.length > 11) {
        newErrors.name = '이름은 3~11자 사이로 입력해 주세요';
        newValidFields.name = false;
      } else {
        newErrors.name = '';
        newValidFields.name = true;
      }
    }

    if (field === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (value.trim() === '') {
        newErrors.email = '이메일을 입력해 주세요';
        newValidFields.email = false;
      } else if (!emailRegex.test(value)) {
        newErrors.email = '이메일 형식에 맞지 않습니다.';
        newValidFields.email = false;
      } else {
        newErrors.email = '';
        newValidFields.email = true;
      }
    }

    if (field === 'password') {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (value.trim() === '') {
        newErrors.password = '비밀번호를 입력해 주세요';
        newValidFields.password = false;
      } else if (!passwordRegex.test(value)) {
        newErrors.password = '비밀번호는 숫자, 대문자, 특수문자 포함 최소 8자 이상이어야 합니다.';
        newValidFields.password = false;
      } else {
        newErrors.password = '';
        newValidFields.password = true;
      }
    }

    if (field === 'repassword') {
      if (value.trim() === '') {
        newErrors.repassword = '비밀번호 확인을 입력해 주세요';
        newValidFields.repassword = false;
      } else if (value !== password) {
        newErrors.repassword = '비밀번호가 일치하지 않습니다. 다시 확인해 주세요.';
        newValidFields.repassword = false;
      } else {
        newErrors.repassword = '';
        newValidFields.repassword = true;
      }
    }

    setErrors(newErrors);
    setIsValidField(newValidFields);
  };

  const handleBlur = (field) => {
    const value =
      field === 'name'
        ? name
        : field === 'email'
        ? email
        : field === 'password'
        ? password
        : repassword;
    validateField(field, value);
  };

  const validateFields = () => {
    validateField('name', name);
    validateField('email', email);
    validateField('password', password);
    validateField('repassword', repassword);
    const hasErrors = Object.values(errors).some(error => error !== '');

    return !hasErrors && Object.values(isValidField).every((valid) => valid);
  };

  const allFieldsFilled = () => {
    return name.trim() && email.trim() && password.trim() && repassword.trim();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!allFieldsFilled()) {
      alert('모든 필드를 채워주세요.');
      return;
    }
    if (!validateFields()) {
      console.log('유효성 검사 실패');
      return;
    }
    setIsLoading(true);
    try {
      const params = { email, name, password };
      const res = await api.post('/user', params);
      if (res.status === 200) {
        navigate('/');
      }
      throw new Error(res.message);
    } catch (error) {
      console.error('error');
      setErrorMessages(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <img src="/logo-2.png" alt="logo" className={styles.logo} />
          {errorMessages && <div className={styles.error}>🚨 {errorMessages}</div>}
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
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => handleBlur('name')}
                  className={`${styles.input} ${isValidField.name ? styles.valid : ''}`}
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  placeholder="이메일을 입력해 주세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={`${styles.input} ${isValidField.email ? styles.valid : ''}`}
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  placeholder="숫자,대문자,특수문자 포함 최소 8자 이상"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  className={`${styles.input} ${isValidField.password ? styles.valid : ''}`}
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
                  placeholder="비밀번호 확인"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                  onBlur={() => handleBlur('repassword')}
                  className={`${styles.input} ${isValidField.repassword ? styles.valid : ''}`}
                />
                {errors.repassword && (
                  <span className={styles.error}>{errors.repassword}</span>
                )}
              </div>

              <button type="submit" className={styles.primaryButton}>
                회원가입
              </button>
              <span className={styles.link}>
                이미 회원이신가요? <Link to="/">로그인 하기</Link>
              </span>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
