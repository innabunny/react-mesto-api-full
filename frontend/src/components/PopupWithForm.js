function PopupWithForm({name, title, children, isOpen, onClose, onSubmit, buttonTitle= 'Сохранить'}) {

  return(
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_open' : ''}`}>
      <div className="popup__container">
        <button className="popup__button-close" type="button" onClick={onClose}></button>
        <form
          name={`${name}`} className={`popup__form popup__form_type_${name}`}
           onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className="popup__button-submit">{buttonTitle}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm