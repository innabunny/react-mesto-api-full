function ImagePopup({card, isOpen, onClose}) {
  return(
    <div className={`popup popup_type_image ${isOpen ? 'popup_open' : '' }`}>
      <div className="popup__image-view">
        <button type="button" className="popup__button-close" onClick={onClose}></button>
        <img className="popup__image" src={card ? card.link : ''} alt={card.name} />
        <p className="popup__image-caption">{card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup