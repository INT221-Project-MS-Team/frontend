import * as Msal from 'msal';

export const msalConfig = {
  auth: {
    clientId: "b05feac4-bd36-4f70-a6fa-b72068155c83", // This is the ONLY mandatory field that you need to supply.
    authority: "https://login.microsoftonline.com/6f4432dc-20d2-441d-b1db-ac3380ba633d", // Defaults to "https://login.microsoftonline.com/common"
    redirectUri: "http://localhost:8080", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.href
    navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
  },
  cache: {
    cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO.
    storeAuthStateInCookie: false, // If you wish to store cache items in cookies as well as browser cache, set this to "true".
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case Msal.LogLevel.Error:
            console.error(message);
            return;
          case Msal.LogLevel.Info:
            console.info(message);
            return;
          case Msal.LogLevel.Verbose:
            console.debug(message);
            return;
          case Msal.LogLevel.Warning:
            console.warn(message);
            return;
        }
      }
    }
  }
};

export const loginRequest = {
  scopes: ["openid", "profile"],
};
