import React from "react";
import success from '../images/success.svg';
import error from '../images/error.svg';
function InfoTooltip({isOpen, onClose,requestStatus}) {
  return(
    <div className={`popup popup_type_tooltip ${isOpen ? "popup_open" : ""}`}>
      <div className="popup__container">
        <img src={requestStatus ? success : error} alt="success" className="popup__tooltip-image"/>
        <h2 className="popup__tooltip-title">{requestStatus ? "Вы успешно зарегистрировались!" : "Что-то пошло не так!\n" +
          "Попробуйте ещё раз."}</h2>
        <button onClick={onClose} type="button" className="popup__button-close"></button>
      </div>
    </div>
  )
}

export default InfoTooltip