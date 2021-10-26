import _ from 'lodash';
import { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../context/ProvideAuth.jsx';
import { getData, newMessage } from '../../redux/actions/data';
import { useSocket } from '../../context/ProvideSocket.jsx';
import Messages from './Messages/Messages.jsx';

const ChatContent = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentChannelId, messages } = useSelector((state) => state.data);
  const { username } = useAuth().state;
  const currentChannelMessages = _.filter(messages, { channelId: currentChannelId });

  useEffect(() => {
    dispatch(getData());
    socket.on('newMessage', (message) => {
      dispatch(newMessage({ message }));
    });

    return () => socket.removeListener('newMessage');
  }, []);

  const handleNewMessage = ({ textmessage }, helpers) => {
    const message = {
      username,
      textmessage,
      channelId: currentChannelId,
    };

    socket.emit('newMessage', message);
    helpers.resetForm();
  };

  return (
    <div className="h-100 d-flex flex-column justify-content-between">
      <div className="chat-header">
        <h5 className="mt-2">
          {`${t('chat.messages')}:`}
        </h5>
      </div>
      <Messages messages={currentChannelMessages} />
      <div className="form-group mb-3">
        <Formik initialValues={{ textmessage: '' }} onSubmit={handleNewMessage}>
          <Form className="d-flex">
            <div className="flex-fill me-1">
              <Field
                autoComplete="off"
                data-testid="new-message"
                placeholder={t('chat.messagePlaceholder')}
                className="form-control"
                type="text"
                name="textmessage"
              />
            </div>
            <button className="btn btn-primary ms-1" type="submit">
              {t('chat.submit')}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ChatContent;
