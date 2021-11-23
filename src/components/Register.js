import React from 'react';

function Register(props) {


  return (
    <div className="content">
      <h2 className="popup__title">{props.title}</h2>
      <form className="popup__form" name={`form-${props.name}`} onSubmit={props.onSubmit}>
        <input id="name-user-input" className="popup__input popup__input_type_name"
               type="text" name="name" required minLength="2" maxLength="40"
               placeholder="Имя пользователя" />
        <span className="popup__input-error name-user-input-error"></span>
        <input id="description-input" className="popup__input popup__input_type_description"
               type="text" name="description" required minLength="2" maxLength="200"
               placeholder="Информация о пользователе" />
        <span className="popup__input-error description-input-error"></span>
        <button className="popup__button" type="submit">
            {props.isLoading ? `${props.buttonText}...` : `${props.buttonText}`}
        </button>
      </form>
    </div>
  );
}

export default Register;