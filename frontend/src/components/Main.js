import {useContext} from "react";
import Card from './Card.js';
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

function Main({onEditProfile, onEditAvatar, onAddCard, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="ваше фото" className="profile__image" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__button-edit" type="button" onClick={onEditProfile}></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button className="profile__button-add" type="button" onClick={onAddCard}></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            likes={card.likes.length}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardRemove={onCardDelete}/>
        ))}
      </section>
    </main>
  )
}

export default Main