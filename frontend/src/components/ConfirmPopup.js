import PopupWithForm from "./PopupWithForm.js";

function ConfirmPopup({isOpen, onClose, onCardDelete, card}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name={'confirm'}
      title={'Вы уверены?'}
      buttonTitle={"Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      />
  )
}

export default ConfirmPopup