import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginRegisterForm from './LoginRegisterForm';
import auth from '../utils/Auth';

function Register(props) {

  const navigate = useNavigate(); 

  /** Записывает имя и адрес ссылки в стейт-переменные */
  props.onPage("Войти", "/sign-in");

  return (
    <LoginRegisterForm title="Регистрация"
                       textButton="Зарегистрироваться"
                       onSubmit={props.onSubmit} >
      <Link to="/sign-in" className="link link_type_small">
        Уже зарегистрированы? Войти
      </Link>
    </LoginRegisterForm>
  );
}

export default Register;