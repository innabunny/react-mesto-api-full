class AuthApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(result) {
    if (result.ok) {
      return result.json();
    } else {
      return Promise.reject(`Ошибка: ${result.status}`);
    }
  }

  loginUser(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => this._checkResponse(res));

  }

  registerUser(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => this._checkResponse(res));
  }

  checkToken(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
    })
      .then(res => this._checkResponse(res));
  }

}

const authApi = new AuthApi('http://api.igmesto.nomoredom.nomoredomainsclub.ru');

export default authApi;