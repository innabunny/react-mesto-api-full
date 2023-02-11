class Api {
  constructor({url, headers}) {
    this._baseUrl = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(new Error (`Ошибка загрузки данных ${res.status}`));
    }
  }

  _request(url, options) {
    return fetch(url, options).then((res) => this._checkResponse(res));
  }

  setToken(token) {
    localStorage.setItem("jwt", token);
    this._headers.authorization = "Bearer " + token;
  }

  getUserData() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers});
  }

  getCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers});
  }

  addCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
  }

  editUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    });
  }

  likeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    });
  }

  deleteLikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  changeAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    });
  }
}

export const api = new Api({
  url: 'https://api.igmesto.nomoredom.nomoredomainsclub.ru',
  headers: {
    // authorization: '2ca56f07-fcb4-4986-82c9-567bd5155cbe',
     'Authorization' : `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json',
  }
})