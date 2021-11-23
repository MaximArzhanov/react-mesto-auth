import React from 'react';
import { Link } from 'react-router-dom';
import LoginRegisterForm from './LoginRegisterForm';

function Register(props) {


  return (
    <LoginRegisterForm title="Регистрация" textButton="Зарегистрироваться">
      <Link to="/sign-in" className="link link_type_small">
        Уже зарегистрированы? Войти
      </Link>
    </LoginRegisterForm>
  );
}

export default Register;