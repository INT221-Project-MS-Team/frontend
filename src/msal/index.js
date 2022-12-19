import * as Msal from 'msal';
import { msalConfig, loginRequest } from './authConfig';

export default class AuthService {
  constructor() {
    this.app = new Msal.UserAgentApplication(msalConfig);
  }

  async loginPopup() {
    return this.app
      .loginPopup(loginRequest)
      .then((response) => {
        console.log(response);
        console.log(response.idTokenClaims);
        const user = this.app.getAccount();
        if (user) {
          console.log(user);
          return user;
        } else {
          console.log('no user');
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  loginRedirect() {
    this.app.loginRedirect(loginRequest);
  }

  logout() {
    this.app.logout();
  }

  // Graph Related
  getGraphToken() {
    return this.app.acquireTokenSilent(this.applicationConfig.graphScopes).then(
      (accessToken) => {
        return accessToken;
      },
      (error) => {
        return this.app
          .acquireTokenPopup(this.applicationConfig.graphScopes)
          .then(
            (accessToken) => {
              return accessToken;
            },
            (err) => {
              console.error(err);
            }
          );
      }
    );
  }

  async getGraphUserInfo(token) {
    const headers = new Headers({ Authorization: `Bearer ${token}` });
    const options = {
      headers,
    };
    return fetch(`${this.graphUrl}`, options)
      .then((response) => response.json())
      .catch((response) => {
        throw new Error(response.text());
      });
  }

  // Utility
  getUser() {
    return this.app.getAccount();
  }
}
