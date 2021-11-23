import React from 'react';

function LoginRegisterForm(props) {
  const { title, textButton } = props;
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit();
  }

  return (
    <div className="content content_type_form">
      <h2 className="content__title">{title}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input id="email-input" className="form__input form__input_type_black"
               type="email" name="email" required
               placeholder="Email" />
        <span className="form__input-error name-user-input-error"></span>
        <input id="password-input" className="form__input form__input_type_black"
               type="password" name="password" required minLength="2" maxLength="200"
               placeholder="Пароль" />
        <span className="form__input-error description-input-error"></span>
        <button className="form__button form__button_type_white" type="submit">
          {textButton}
        </button>
      </form>
      {props.children}
    </div>
  );
}

export default LoginRegisterForm;