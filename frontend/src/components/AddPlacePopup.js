import PopupWithForm from "../components/PopupWithForm.js";
import {useEffect, useState} from "react";

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {
  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');

  function handleChangeName(evt) {
    setCardName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setCardLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({name: cardName, link: cardLink});
  }

  useEffect(() => {
    if(isOpen) {
      setCardName(''); setCardLink('');
    }
    }, [isOpen])

  return (
    <PopupWithForm name={'card-add'} title={'Новое место'}
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        minLength="2"
        maxLength="30"
        required
        id="add-name-input"
        className="popup__input popup__input_type_name"
        placeholder="Название"
        value={cardName}
        onChange={handleChangeName}
      />
      <span className="popup__input-error" id="add-name-input-error"></span>
      <input
        type="url"
        name="link"
        required
        id="add-link-input"
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку"
        value={cardLink}
        onChange={handleChangeLink}
      />
      <span className="popup__input-error" id="add-link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup