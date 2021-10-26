import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../context/ProvideAuth.jsx';

const Logout = () => {
  const auth = useAuth();

  useEffect(() => {
    auth.signOut();
  }, []);

  return <Redirect to="/" />;
};

export default Logout;
