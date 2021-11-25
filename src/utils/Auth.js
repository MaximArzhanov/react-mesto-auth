import { baseUrlAuth } from './constants.js';

class Auth {
    constructor(baseUrlAuth) {
      this._baseUrlAuth = baseUrlAuth;
    }

    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    register(password, email) {
      return fetch(`${this._baseUrlAuth}signup`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          password: password,
          email: email
        })
      })
      .then(this._checkResponse)
    };

    authorization(password, email) {
      return fetch(`${this._baseUrlAuth}signin`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          password: password,
          email: email
        })
      })
      .then(this._checkResponse)
    };

    checkToken(jwt) {
      return fetch(`${this._baseUrlAuth}users/me`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${jwt}`
        }
      })
      .then(this._checkResponse)
    };
}

const auth = new Auth(baseUrlAuth);
export default auth;

