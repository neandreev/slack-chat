import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import getData from '../../redux/actions/data';
import Channels from '../../components/Chat/Channels.jsx';
import Messages from '../../components/Chat/Messages.jsx';

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow border">
      <div className="row h-100">
        <div className="col-4 col-md-2 bg-light">
          <Channels />
        </div>
        <div className="col h-100">
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default Chat;
