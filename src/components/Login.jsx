import React from "react";
import LoginRegisterForm from "./LoginRegisterForm";

function Login(props) {

  /** Записывает имя и адрес ссылки в стейт-переменные */
  React.useEffect(() => {
    props.onPage("Регистрация", "/sign-up");
  }, []);

  return (
    <LoginRegisterForm
      title="Вход"
      textButton="Войти"
      onSubmit={props.onSubmit}
    />
  );
}

export default Login;
