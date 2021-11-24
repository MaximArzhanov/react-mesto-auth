import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginRegisterForm from './LoginRegisterForm';
import auth from '../utils/Auth';

function Login(props) {

  const navigate = useNavigate(); 

  /** Записывает имя и адрес ссылки в стейт-переменные */
  props.onPage("Регистрация", "/sign-up");

  /** Обработчик авторизации пользователя */
  function handleUserAuthorization(password, email) {
    auth.authorization(password, email)
      .then((data) => {
        props.onLogin(true);
        props.SetUserEmail(email);
        navigate('/');
        localStorage.setItem('jwt', data.token);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <LoginRegisterForm title="Вход" textButton="Войти" onSubmit={handleUserAuthorization} />
  );
}

export default Login;