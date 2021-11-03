import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from './context/ProvideAuth.jsx';

import Login from './components/Login/Login.jsx';
import Logout from './components/Logout/Logout.jsx';
import Signup from './components/Signup/Signup.jsx';
import Chat from './containers/Chat/Chat.jsx';
import Modal from './components/Chat/ChannelsModal/ChannelsModal.jsx';

const NoMatch = () => {
  const message = 'Error 404';

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

const Nav = ({ token }) => {
  const { t } = useTranslation();

  return (
    <nav className="navbar navbar-light bg-light shadow">
      <div className="container justify-content-between">
        <Link tabIndex="0" to="/" className="navbar-brand">Slack Chat</Link>
        {
          token
            ? <Link tabIndex="0" to="/logout">{t('navigation.logout')}</Link>
            : null
        }
      </div>
    </nav>
  );
};

const AuthenticatedSwitch = () => (
  <Switch>
    <Route path="/logout" component={Logout} />
    <Redirect from="/login" to="/" />
    <Redirect from="/signup" to="/" />
    <Route exact path="/" component={Chat} />
    <Route path="*" component={NoMatch} />
  </Switch>
);

const UnauthenticatedSwitch = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Redirect from="/" to="/login" />
    <Route path="*" component={NoMatch} />
  </Switch>
);

const App = () => {
  const auth = useAuth();

  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Nav token={auth.state.token} />
        {
          auth.state.token
            ? <AuthenticatedSwitch />
            : <UnauthenticatedSwitch />
        }
      </div>
      <Modal />
    </BrowserRouter>
  );
};

export default App;
