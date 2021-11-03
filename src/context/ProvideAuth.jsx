import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const initialState = { unauthorized: false, token: false, username: null };

const useProvideAuth = () => {
  const [state, setState] = useState({
    username: null || localStorage.getItem('username'),
    token: localStorage.getItem('token'),
    unauthorized: false,
    conflict: false,
  });

  const auth = {
    signIn: async (cb, values) => {
      try {
        const normalized = { ...values, username: values.username.toLowerCase() };
        const res = await axios.post('/api/v1/login', normalized);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', normalized.username);
        setState({
          ...state,
          token: res.data.token,
          unauthorized: false,
          username: normalized.username,
        });
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
      } catch (error) {
        setState({ ...state, conflict: true });
        console.log(error);
      }
    },
    signOut: () => {
      setState({ ...state, ...initialState });
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
    resetForm: () => {
      setState((oldState) => ({ ...oldState, conflict: false, unauthorized: false }));
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
