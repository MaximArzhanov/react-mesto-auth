import React from 'react';

function Login(props) {


  return (
    <div className="content content_type_form">
      <h2 className="content__title">Вход</h2>
      <form className="form">
        <input id="name-user-input" className="form__input form__input_type_black"
               type="text" name="name" required minLength="2" maxLength="40"
               placeholder="Имя пользователя" />
        <span className="form__input-error name-user-input-error"></span>
        <input id="description-input" className="form__input form__input_type_black"
               type="text" name="description" required minLength="2" maxLength="200"
               placeholder="Информация о пользователе" />
        <span className="form__input-error description-input-error"></span>
        <button className="form__button form__button_type_white" type="submit">
          Кнопка
        </button>
      </form>
    </div>
  );
}

export default Login;