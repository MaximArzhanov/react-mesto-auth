import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ConfirmationPopup from './ConfirmationPopup'
import ImagePopup from './ImagePopup'
import Register from './Register';
import Login from './Login';
import InfoToolTip from './InfoToolTip';
import api from '../utils/Api'
import auth from '../utils/Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import '../index.css';

function App() {

  /** Email пользователя */
  const [userEmail, SetUserEmail] = React.useState("");

  const navigate = useNavigate(); 

  /** Имя ссылки (для Header) */
  const [linkName, SetLinkName] = React.useState("");
  /** Адрес ссылки (для Header) */
  const [linkRoute, SetLinkRoute] = React.useState("");

  /** Записывает имя и адрес ссылки в стейт-переменные */
  function onPage(name, route) {
    SetLinkName(name);
    SetLinkRoute(route);
  }

  /** Текущий пользователь */
  const [currentUser, SetCurrentUser] = React.useState({});

  /** Состояние загрузки */
  const [isLoading, SetIsLoading] = React.useState(false);

  /** Состояние регистрации */
  const [isRegistrationSuccsses, SetIsRegistrationSuccsses] = React.useState(false);

  /** Состояние авторизации */
  const [loggedIn, SetLoggedIn] = React.useState(false);

  /** Карточка (Для удаления) */
  const [card, SetCard] = React.useState({});

  const [isEditProfilePopupOpen, SetIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, SetIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, SetIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, SetIsConfirmationPopupOpen] = React.useState(false);
  const [isRegistationResultPopupOpen, SetIsRegistationResultPopupOpen] = React.useState(false);

  const [selectedCard, SetSelectedCard] = React.useState({});

  /** Массив загруженных карточек */
  const [cards, SetCards] = React.useState([]);

  function handleSetUserEmail(email) {
    SetUserEmail(email);
  }

  /** Проверяет наличие токена */
  function tokenCheck() {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then((data) => {
          SetLoggedIn(true);
          handleSetUserEmail(data.data.email)
          navigate('/');
        })
        .catch((err) => {
          console.error(err);
        })
    }
  }

  /** Эффект при загрузке приложения */
  React.useEffect(() => {
    tokenCheck();
  }, []);

  /** Выходит из аккаунта. Удаляет токен */
  function handleSignOutClick() {
    navigate('/sign-in');
    localStorage.removeItem('jwt');
    SetLoggedIn(false);
  }

  /** Открывает окно редактирования профиля */
  function handleEditProfileClick() {
    SetIsEditProfilePopupOpen(true);
  }

  /** Открывает окно добавления новой карточки */
  function handleAddPlaceClick() {
    SetIsAddPlacePopupOpen(true);
  }

  /** Открывает окно обновления аватарки */
  function handleEditAvatarClick() {
    SetIsEditAvatarPopupOpen(true);
  }

  /** Открывает окно подтверждения */
  function handleConfirmationClick(card) {
    SetCard(card);
    SetIsConfirmationPopupOpen(true);
  }

  /** Открывает окно с увеличенным изображением */
  function handleCardClick(card) {
    SetSelectedCard(card);
  }

  /** Открывает окно с результатом регистрации */
  function handleRegistration(isSuccsses) {
    SetIsRegistrationSuccsses(isSuccsses);
    SetIsRegistationResultPopupOpen(true);
  }

  /** Обновляет стейт-переменную loggedIn */
  function handleAuthorization(isSuccsses) {
    SetLoggedIn(isSuccsses);
  }

  /** Закрывает все модальные окна */
  function closeAllPopups() {
    SetIsEditProfilePopupOpen(false);
    SetIsAddPlacePopupOpen(false);
    SetIsEditAvatarPopupOpen(false);
    SetIsConfirmationPopupOpen(false);
    SetIsRegistationResultPopupOpen(false);
    SetSelectedCard({});
  }

  /** Запрашивает карточки и информацию о пользователе при загрузке страницы */
  React.useEffect(() => {
    SetIsLoading(true);
    Promise.all([api.getUserInformation(), api.getCards()])
      .then((data) => {
        SetCurrentUser(data[0]);
        SetCards(data[1].map((item) => (item)));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        SetIsLoading(false);
      });
  }, [] );

  /** Обновляет информацию о пользователе */
  function handleUpdateUser({ name, about }) {
    SetIsLoading(true);
    api.updateUserInformation(name, about)
      .then((data) => {
        SetCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        SetIsLoading(false);
      });
  }

  /** Обновляет аватарку пользователя */
  function handleUpdateAvatar({ avatar }) {
    SetIsLoading(true);
    api.updateUserAvatar(avatar)
      .then((data) => {
        SetCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        SetIsLoading(false);
      });
  }

  /** Добавляет новую карточку */
  function handleAddPlaceSubmit({ name, link }) {
    SetIsLoading(true);
    api.addCard(name, link)
      .then((newCard) => {
        SetCards([newCard, ...cards]); 
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        SetIsLoading(false);
      });
  }

  /** Удаляет карточку  */
  function handleCardDeleteSubmit(card) {
    SetIsLoading(true);
    api.deleteCard(card._id)
      .then((data) => {
        SetCards((state) => state.filter((c) => {
          return (c._id !== card._id) //Возвращает все карточки кроме той которую удалили
        }));
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        SetIsLoading(false);
      });
  }

  /** Определяет, ставил ли пользователь лайк для текущей карточки
  *   Ставит/удаляет лайк   */
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        SetCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <div className="root">

      <CurrentUserContext.Provider value={currentUser}>

        <div className="page root__page">
          <Header linkName={linkName}
                  linkRoute={linkRoute}
                  signOut={handleSignOutClick}
                  isLoggedIn={loggedIn}
                  userEmail={userEmail} />
          <Routes>
              <Route path="/sign-in" 
                     element={<Login
                                onPage={onPage} 
                                onLogin={handleAuthorization}
                                SetUserEmail={SetUserEmail} />}
              />
              <Route path="/sign-up"
                     element={<Register 
                                onPage={onPage}
                                onRegister={handleRegistration}
                              />}
              />
              <Route exact path="/" element={
                  loggedIn ? 
                    <Main onEditProfile={handleEditProfileClick}
                          onAddPlace={handleAddPlaceClick}
                          onEditAvatar={handleEditAvatarClick}
                          onConfirmation={handleConfirmationClick}
                          onCardClick={handleCardClick}
                          cards={cards}
                          onCardLike={handleCardLike}
                          isLoading={isLoading}
                          onPage={onPage}
                    />  :
                    <Navigate to="/sign-in" />
                }
              />
          </Routes>
          <Footer />
        </div>
        
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                          onUpdateUser={handleUpdateUser}
                          isLoading={isLoading} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                         onUpdateAvatar={handleUpdateAvatar}
                         isLoading={isLoading} /> 
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                       onAddPlace={handleAddPlaceSubmit}
                       isLoading={isLoading} />
        <ConfirmationPopup isOpen={isConfirmationPopupOpen} onClose={closeAllPopups}
                                   onConfirmation={handleCardDeleteSubmit}
                                   isLoading={isLoading}
                                   card={card} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

        <InfoToolTip isOpen={isRegistationResultPopupOpen}
                     name="info-tool-tip"
                     onClose={closeAllPopups} 
                     onUpdateAvatar={handleRegistration}
                     isRegistrationSuccsses={isRegistrationSuccsses} />

      </CurrentUserContext.Provider>

    </div>
  );
}

export default App;
