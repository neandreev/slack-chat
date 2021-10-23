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
  }

  return (
    <div className="h-100 m-1 d-flex flex-column justify-content-between">
      <div className="chat-header">
        <h5 className="mt-1">
          {`${t('chat.messages')}:`}
        </h5>
      </div>
      <div className="d-flex flex-column">
        <Messages messages={currentChannelMessages} />
        <div className="form-group mb-2">
          <Formik initialValues={{ textmessage: '' }} onSubmit={handleNewMessage}>
            <Form className="d-flex">
              <div className="flex-fill me-1">
                <Field placeholder={t('chat.messagePlaceholder')} className="form-control" type="text" name="textmessage" />
              </div>
              <button className="btn btn-primary ms-1" type="submit">{t('chat.submit')}</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
