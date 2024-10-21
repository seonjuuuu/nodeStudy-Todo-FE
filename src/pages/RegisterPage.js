import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

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
      const params = {
        email,
        name,
        password,
      };
      const res = await api.post('/user', params);
      if (res.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.error('error');
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
    if (email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        alert('이메일 형식에 맞지 않습니다.');
        emailRef.current.focus();
        return false;
      }
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
    <div className="display-center">
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>이름</Form.Label>
          <Form.Control
            type="string"
            placeholder="이름입력(3~11자)"
            onChange={(event) => setName(event.target.value)}
            ref={nameRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
            ref={emailRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="숫자,대문자,특수문자 포함 최소 8자이상"
            onChange={(event) => setPassword(event.target.value)}
            ref={passwordRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            placeholder="숫자,대문자,특수문자 포함 최소 8자이상"
            onChange={(event) => setRepassword(event.target.value)}
            ref={repasswordRef}
          />
          <p></p>
        </Form.Group>
        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
