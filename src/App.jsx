import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Login from './containers/Login/Login.jsx';
import Logout from './components/Logout/Logout.jsx';
import Signup from './containers/Signup/Signup.jsx';
import { useAuth } from './context/ProvideAuth';
import Chat from './containers/Chat/Chat.jsx';
import Modal from './components/Chat/ChannelsModal/ChannelsModal';
import { useSelector } from 'react-redux';

const App = () => {
  const auth = useAuth();
  const modal = useSelector(state => state.modal);
  const { t } = useTranslation();

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <nav className="navbar navbar-light bg-light shadow">
          <div className="container justify-content-between">
            <Link tabIndex="0" to="/" className="navbar-brand">Hexlet Chat</Link>
            {
              auth.state.token
                ? <Link tabIndex="0" to="/logout">{t('navigation.logout')}</Link>
                : null
            }
          </div>
        </nav>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route exact path="/">
            {
              auth.state.token
                ? <Chat />
                : <Redirect to="/login" />
            }
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
      {
        modal.isOpened
          ? <Modal />
          : null  
      }
    </Router>
  );
};

const Loader = () => (
  <div className="App">
    <div>loading...</div>
  </div>
);

const NoMatch = () => {
  const message = 'Error 404';

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

export default App;
