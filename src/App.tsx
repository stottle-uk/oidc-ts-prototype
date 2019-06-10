import Oidc, { UserManager, UserManagerSettings } from 'oidc-client';
import React from 'react';
import './App.css';
import { globoIdConfig } from './env';

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.DEBUG;

const App: React.FC = () => {
  var settings: UserManagerSettings = {
    authority: globoIdConfig.authority,
    client_id: globoIdConfig.client_id,
    redirect_uri: window.location.origin,
    response_type: 'code',
    scope: 'openid profile',

    filterProtocolClaims: true,
    loadUserInfo: true
  };

  const userManager = new UserManager(settings);

  const signIn = () => {
    userManager.signinRedirect({ state: 'some string' });
  };

  const processLoginResponse = () => {
    userManager
      .signinRedirectCallback()
      .then(function(user) {
        console.log('signed in', user);
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  if (window.location.href.indexOf('code=') >= 0) {
    processLoginResponse();
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={signIn}>Login</button>
      </header>
    </div>
  );
};

export default App;
