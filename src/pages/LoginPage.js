import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

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
    <div className="display-center">
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
            ref={emailRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            ref={passwordRef}
          />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
