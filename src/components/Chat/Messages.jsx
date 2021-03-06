import React, { useEffect, useRef } from 'react';
import _ from 'lodash';
import { Formik, Field, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../context/ProvideAuth.jsx';
import { newMessage } from '../../redux/slices/messages';
import { useSocket } from '../../context/ProvideSocket.jsx';

const NewMessageForm = () => {
  const { t } = useTranslation();

  return (
    <Form>
      <div className="d-flex mb-3">
        <div className="flex-fill mr-1">
          <Field
            autoComplete="off"
            data-testid="new-message"
            placeholder={t('chat.messagePlaceholder')}
            className="form-control"
            type="text"
            name="textmessage"
          />
        </div>
        <button className="btn btn-primary ml-1" type="submit">
          {t('chat.submit')}
        </button>
      </div>
    </Form>
  );
};

const handleNewMessage = (socket) => (username, channelId) => (
  ({ textmessage }, helpers) => {
    const message = {
      username,
      textmessage,
      channelId,
    };

    socket.emit('newMessage', message);
    helpers.resetForm();
  }
);

const MessagesElements = ({ messages }) => (
  <>
    {
      messages.map(({ username, textmessage }) => (
        <div key={username + textmessage + _.uniqueId()} className="my-1 rounded p-1 d-flex">
          <div className="message-username mx-1 fw-bold">
            {username}
            :
          </div>
          <div className="message-text">{textmessage}</div>
        </div>
      ))
    }
  </>
);

const MessagesList = () => {
  const { t } = useTranslation();
  const messages = useSelector((state) => state.messages);
  const messagesRef = useRef(null);
  const { currentChannelId } = useSelector((state) => state.channels);
  const currentChannelMessages = _.filter(messages, { channelId: currentChannelId });

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  return (
    <div ref={messagesRef} className="overflow-auto h-100 mb-1">
      {
        currentChannelMessages.length !== 0
          ? <MessagesElements messages={currentChannelMessages} />
          : <div>{t('chat.noMessages')}</div>
      }
    </div>
  );
};

const Messages = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentChannelId } = useSelector((state) => state.channels);
  const { username } = useAuth().state;

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(newMessage({ message }));
    });

    return () => socket.removeListener('newMessage');
  }, []);

  return (
    <div className="h-100 d-flex flex-column justify-content-between">
      <div className="chat-header">
        <h5 className="mt-2">
          {`${t('chat.messages')}:`}
        </h5>
      </div>
      <MessagesList />
      <Formik
        initialValues={{ textmessage: '' }}
        onSubmit={handleNewMessage(socket)(username, currentChannelId)}
        component={NewMessageForm}
      />
    </div>
  );
};

export default Messages;
