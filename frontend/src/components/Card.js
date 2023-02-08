import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

function Card({card, onCardClick, onCardLike, onCardRemove}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__button-like ${isLiked ? "element__button-like_active" : ""}`;
  const buttonDelete = `${isOwner ? "element__button-delete" : ""}`;

  const handleLikeCard = () => {
    onCardLike(card);
  }

  return(
      <article className="element">
        <img src={card.link} alt={card.name} className="element__image" onClick={() => onCardClick(card)}/>
          <div className="element__info">
            <h2 className="element__title">{card.name}</h2>
            <div className="element__like">
              <button className={cardLikeButtonClassName} type="button"
              onClick={handleLikeCard}  />
              <div className="element__like-count">{card.likes.length}</div>
            </div>
          </div>
          <button
            type="button"
            className={buttonDelete}
            // hidden={`${isOwner ? '' : 'hidden'}`}
          onClick={() => onCardRemove(card)}></button>
      </article>
  )
}

export default Card