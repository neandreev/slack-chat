import { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const useProvideAuth = () => {
  const [state, setState] = useState({
    username: null || localStorage.getItem('username'),
    token: localStorage.getItem('token'),
    unauthorized: null,
    conflict: null,
  });

  const auth = {
    signIn: async (cb, values) => {
      try {
        const normalized = { ...values, username: values.username.toLowerCase() };
        const res = await axios.post('/api/v1/login', normalized);
        setState({
          ...state,
          token: res.data.token,
          unauthorized: false,
          username: normalized.username,
        });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', normalized.username);
        cb();
      } catch (e) {
        setState({ ...state, unauthorized: true });
      }
    },
    signUp: async (cb, values) => {
      try {
        const res = await axios.post('/api/v1/signup', values);
        setState({
          ...state,
          token: res.data.token,
          conflict: false,
          unauthorized: false,
          username: values.username,
        });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', values.username);
        cb();
      } catch(error) {
        setState({ ...state, conflict: true });
        console.log(error);
      }
    },
    signOut: () => {
      setState({ ...state, unauthorized: null, token: null, username: null });
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
  };

  return { state, ...auth };
};

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth}>
      { children }
    </AuthContext.Provider>
  );
};

export default ProvideAuth;
