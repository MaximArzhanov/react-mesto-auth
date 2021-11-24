import React from 'react';

function LoginRegisterForm(props) {

  const { title, textButton } = props;
  
  const [email, SetEmail] = React.useState('');
  const [password, SetPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit();
  }

  /** Записывает email пользователя в стейт-переменную */
  function handleChangeEmail(e) {
    SetEmail(e.target.value);
    console.log(email);
  }

  /** Записывает пароль пользователя в стейт-переменную */
  function handleChangePassword(e) {
    SetPassword(e.target.value);
    console.log(password);
  }

  return (
    <div className="content content_type_form">
      <h2 className="content__title">{title}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input id="email-input" className="form__input form__input_type_black"
               type="email" name="email" required
               placeholder="Email"
               value={email || ''} onChange={handleChangeEmail} />
        <span className="form__input-error email-input-error"></span>
        <input id="password-input" className="form__input form__input_type_black"
               type="password" name="password" required minLength="2" maxLength="200"
               placeholder="Пароль"
               value={password || ''} onChange={handleChangePassword} />
        <span className="form__input-error password-input-error"></span>
        <button className="form__button form__button_type_white" type="submit">
          {textButton}
        </button>
      </form>
      {props.children}
    </div>
  );
}

export default LoginRegisterForm;