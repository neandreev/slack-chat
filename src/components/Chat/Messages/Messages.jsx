import { useTranslation } from 'react-i18next';

const Messages = ({ messages }) => {
  const { t } = useTranslation();

  return (
    <div style={{ height: '500px' }} className="overflow-auto mb-1">
      {
        messages.length !== 0
          ? messages.map(({ username, textmessage }, id) => {
            return (
              <div key={username + textmessage + id} className="my-1 border rounded p-2 d-flex">
                <div className="message-username mx-1">{username}:</div>
                <div className="message-text">{textmessage}</div>
              </div>
            );
          })
          : <div className="">{t('chat.noMessages')}</div>
        
      }
    </div>
  )
};

export default Messages;
