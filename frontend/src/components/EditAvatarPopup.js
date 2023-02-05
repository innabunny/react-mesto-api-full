import PopupWithForm from "../components/PopupWithForm.js";
import {useEffect, useRef} from "react";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
  const  avatarRef = useRef();


  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({avatar: avatarRef.current.value});
  }

  return (
    <PopupWithForm name={'avatar'} title={'Обновить аватар'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonTitle={isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <input type="url" name="link" required id="avatar-link-input" placeholder="Ссылка на аватар"
       className="popup__input popup__input_type_link"
       ref={avatarRef}
      />
      <span className="popup__input-error" id="avatar-link-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup