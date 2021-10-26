import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { uniqueId } from 'lodash';

const Messages = ({ messages }) => {
  const { t } = useTranslation();
  const messagesRef = useRef(null);

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  return (
    <div ref={messagesRef} className="overflow-auto h-100 mb-1">
      {
        messages.length !== 0
          ? messages.map(({ username, textmessage }) => (
            <div key={username + textmessage + uniqueId()} className="my-1 rounded p-1 d-flex">
              <div className="message-username mx-1 fw-bold">
                {username}
                :
              </div>
              <div className="message-text">{textmessage}</div>
            </div>
          ))
          : <div className="">{t('chat.noMessages')}</div>
      }
    </div>
  );
};

export default Messages;
