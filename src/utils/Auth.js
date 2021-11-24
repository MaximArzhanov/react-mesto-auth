import { baseUrlAuth } from './constants.js';

class Auth {
    constructor(baseUrlAuth) {
      this._baseUrlAuth = baseUrlAuth;
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    };

    checkToken(jwt) {
      return fetch(`${this._baseUrlAuth}users/me`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${jwt}`
        }
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    };
}

const auth = new Auth(baseUrlAuth);
export default auth;

