import PopupWithForm from "../components/PopupWithForm.js";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

function EditProfilePopup({isOpen, onClose, onUpdateUserInfo, isLoading}) {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeAbout(evt) {
    setAbout(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUserInfo({name: name, about: about})
  }

  return (
    <PopupWithForm name={'profile'} title={'Редактировать профиль'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonTitle={isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <input
        type="text" name="name" minLength="2" maxLength="40" required id="name-input"
        className="popup__input popup__input_type_name" placeholder="Имя"
        autoComplete="off"
        value={name || ''}
        onChange={handleChangeName}
      />
      <span className="popup__input-error" id="name-input-error"></span>
      <input
        type="text" name="about" minLength="2" maxLength="200" required id="about-input"
        className="popup__input popup__input_type_about" placeholder="О себе"
        autoComplete="off"
        value={about || ''}
        onChange={handleChangeAbout}
      />
      <span className="popup__input-error" id="about-input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup