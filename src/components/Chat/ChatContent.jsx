import { Formik, Field, Form } from 'formik';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/ProvideAuth';
import { useSelector, useDispatch } from 'react-redux';
import { getData, newMessage } from '../../redux/actions/data';
import Messages from './Messages/Messages';

const ChatContent = ({ socket }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentChannelId, messages } = useSelector((state) => state.data);
  const currentChannelMessages = messages.filter((message) => message.channelId === currentChannelId);
  const { username } = useAuth().state;

  useEffect(() => {
    dispatch(getData());
  }, []);

  const handleNewMessage = ({ textmessage }, helpers) => {
    const message = {
      username,
      textmessage,
      channelId: currentChannelId,
    };

    socket.emit('newMessage', message, (response) => {
      socket.once('newMessage', (message) => {
        dispatch(newMessage({ message }));
        helpers.resetForm();
      })
    });
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
              <Field data-testid="new-message" placeholder={t('chat.messagePlaceholder')} className="form-control" type="text" name="textmessage" />
            </div>
            <button className="btn btn-primary ms-1" type="submit">{t('chat.submit')}</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ChatContent;
