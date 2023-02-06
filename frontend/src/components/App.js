import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ConfirmPopup from "./ConfirmPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import ImagePopup from './ImagePopup.js';
import {useEffect, useState} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { api } from "../utils/Api.js";
import authApi from "../utils/AuthApi.js";
import {Route, Switch, useHistory} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import Register from "../components/Register.js";
import Login from "../components/Login.js";
import InfoTooltip from "../components/InfoTooltip.js";

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false)
  const [isInfoToolPopupOpen, setIsInfoToolPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardRemove, setCardRemove] = useState({})
  const [isLoading, setIsLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [requestStatus, setRequestStatus] = useState(false);

  useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getUserData(), api.getCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => {
          console.log('Ошибка', err);
        })
    }
  },[loggedIn])

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      authApi.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            history.push('/');
          }
        })
        .catch((err) => {
          console.log('Ошибка', err);
        })
    }
  }, [history]);


  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setConfirmPopupOpen(false);
    setSelectedCard({});
    setIsInfoToolPopupOpen(false);
    setIsLoading(false);
  };

  const handleEditProfile = () => {
    setEditProfilePopupOpen(true);
  }

  const handleEditAvatar = () => {
    setEditAvatarPopupOpen(true);
  }

  const handleCardAdd = () => {
    setAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  const handleConfirmPopup = (card) => {
    setCardRemove(card);
    setConfirmPopupOpen(true);
  }

  function handleUpdateUserInfo(data) {
    setIsLoading(true);
    api
      .editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка', err);
      })
  }
  function handleUpdateUserAvatar(data) {
    setIsLoading(true);
    api
      .changeAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка', err);
      })
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка', err);
      })
  }

  // function handleCardLike(card) {
  //   const isLiked = card.likes.some((i) => i._id === currentUser._id);
  //   api
  //     .changeLikeCardStatus(card._id, isLiked)
  //     .then((newCard) => {
  //       setCards((state) =>
  //         state.map((c) => (c._id === card._id ? newCard : c))
  //       );
  //     })
  //     .catch((err) => {
  //       console.log('Ошибка', err);
  //     })
  // }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api.likeCard(card._id)
        .then(newCard => {
          setCards(state => state.map(c => c._id === card._id ? newCard : c))
        })
        .catch(err => console.log(err))
    } else {
      api.deleteLikeCard(card._id)
        .then(newCard => {
          setCards(state => state.map(c => c._id === card._id ? newCard : c))
        })
        .catch(err => console.log(err))
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id && c));
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка', err);
      })
  }
  function handleRegister(data) {
    authApi.registerUser(data.email, data.password)
      .then(() => {
        setRequestStatus(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        setRequestStatus(false);
        console.log('Ошибка', err);
      })
      .finally(() => {
        setIsInfoToolPopupOpen(true);
      })
  }
  function handleAuthorization(data) {
    authApi.loginUser(data.email, data.password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        localStorage.setItem('email', data.email);
        setEmail(data.email);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) =>{
        console.log('Ошибка', err);
      })
  }


  function signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setEmail('');
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
     <div className="page">
       <Header email={email} onLoggedIn={loggedIn} signOut={signOut}/>
       <Switch>
         <ProtectedRoute exact path="/" loggedIn={loggedIn}
                         component={Main}
                         onEditProfile={handleEditProfile}
                         onEditAvatar={handleEditAvatar}
                         onAddCard={handleCardAdd}
                         onCardClick={handleCardClick}
                         cards={cards}
                         onCardLike={handleCardLike}
                         onCardDelete={handleConfirmPopup} />
         <Route path="/sign-up">
           <Register onRegister={handleRegister} />
         </Route>
         <Route path="/sign-in">
           <Login onLogin={handleAuthorization}/>
         </Route>
       </Switch>
        <Footer />
       <EditProfilePopup
         isOpen={isEditProfilePopupOpen}
         onClose={closeAllPopups}
         onUpdateUserInfo={handleUpdateUserInfo}
         isLoading={isLoading}
       />
       <EditAvatarPopup
         isOpen={isEditAvatarPopupOpen}
         onClose={closeAllPopups}
         onUpdateAvatar={handleUpdateUserAvatar}
         isLoading={isLoading}
         />
       <AddPlacePopup
         isOpen={isAddPlacePopupOpen}
         onClose={closeAllPopups}
         onAddPlace={handleAddPlaceSubmit}
         isLoading={isLoading}
         />
        <ConfirmPopup
          onClose={closeAllPopups}
          isOpen={isConfirmPopupOpen}
          card={cardRemove}
          onCardDelete={handleCardDelete}
          />
       <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
       <InfoTooltip isOpen={isInfoToolPopupOpen} onClose={closeAllPopups} requestStatus={requestStatus} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
