import Oidc, { UserManager, UserManagerSettings } from 'oidc-client';
import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';
import { globoIdConfig } from './env';

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.DEBUG;

var settings: UserManagerSettings = {
  authority: globoIdConfig.authority,
  client_id: globoIdConfig.client_id,
  redirect_uri: `${window.location.origin}/callback`,
  response_type: 'code',
  scope: 'openid profile',

  filterProtocolClaims: true,
  loadUserInfo: true
};

const userManager = new UserManager(settings);

const SignIn = () => {
  const signIn = () => {
    userManager.signinRedirect({ state: 'some string' });
  };
  return <button onClick={signIn}>Login</button>;
};

const Callback = () => {
  const processLoginResponse = () => {
    userManager
      .signinRedirectCallback()
      .then(user => {
        console.log('signed in', user);
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (window.location.href.indexOf('code=') >= 0) {
    processLoginResponse();
  }

  return <h2>Callback</h2>;
};

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/callback/">Callback</Link>
                </li>
              </ul>
            </nav>

            <Route path="/" exact component={SignIn} />
            <Route path="/callback/" component={Callback} />
          </div>
        </Router>
      </header>
    </div>
  );
};

export default App;

// https://id.qa.globoi.com/auth/realms/globo.com/protocol/openid-connect/auth?client_id=CLIENTID!!!!!!&redirect_uri=https%3A%2F%2Flocalhost%3A9000&response_type=code&scope=openid%20profile&state=4b94293ab40a45c697fa4b0970de3814&code_challenge=xRkueevDhwso2DGlP7qPsyS9m5N9Y9zaoiVZ_FxJro0&code_challenge_method=S256
