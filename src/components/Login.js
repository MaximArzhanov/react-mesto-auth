import React from 'react';


function Login(props) {


  return (
    <div className="popup__container popup__container_type_form">
      <h2 className="popup__title">{props.title}</h2>
      <form className="popup__form" name={`form-${props.name}`} onSubmit={props.onSubmit}>
        {props.children}
        <button className="popup__button" type="submit">
          {props.isLoading ? `${props.buttonText}...` : `${props.buttonText}`}
        </button>
      </form>
      <button className="popup__icon-close"
              type="button"
              onClick={props.onClose}></button>
    </div>
  );
}

export default Login;