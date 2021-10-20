import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Login from './containers/Login/Login.jsx';
import ProvideAuth, { useAuth } from './components/hoc/ProvideAuth.jsx';

export default function App() {
  const auth = useAuth();

  return (
    <ProvideAuth>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              {
                localStorage.getItem('token')
                  ? <Home />
                  : <Redirect to="/login" />
              }
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

const Home = () => (<h2>Home</h2>);

const NoMatch = () => {
  const message = 'Error 404';

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};
