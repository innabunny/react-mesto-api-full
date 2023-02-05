class Api {
  constructor({url, headers}) {
    this._baseUrl = url;
    this._headers = headers;
  }

  _getHeaders() {
    const token = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${token}`,
      'Accept': "application/json",
      ...this._headers,
    }
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

  getUserData() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._getHeaders()});
  }

  getCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._getHeaders()});
  }

  addCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
  }

  editUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if(!isLiked) {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._getHeaders(),
      });
    }
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    });
  }

  changeAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data.avatar,
      })
    });
  }
}

export const api = new Api({
  url: 'http://api.igmesto.nomoredom.nomoredomainsclub.ru',
  headers: {
    // authorization: '2ca56f07-fcb4-4986-82c9-567bd5155cbe',
    'Content-Type': 'application/json',
  }
})