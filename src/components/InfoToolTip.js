import React from "react";

function InfoToolTip(props) {
  
  return (
    <div className={`popup popup_type_${props.name}
                  ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_type_form">
        <div className="popup__image_type_success"></div>
        <p className="popup__title popup__title_type_center">
          Вы успешно зарегистрировались!
        </p>
        <button className="popup__icon-close"
                type="button"
                onClick={props.onClose}>
        </button>
      </div>
    </div>
  );
}

export default InfoToolTip;