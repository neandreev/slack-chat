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

const App = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Hexlet Chat</Link>
            </li>
            {
              auth.state.token
                ? <li><Link to="/logout">{t('navigation.logout')}</Link></li>
                : null
            }
          </ul>
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

      <Modal />
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
