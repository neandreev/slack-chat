import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../context/ProvideSocket';
import { getData } from '../../redux/actions/data';
import Loading from '../../components/Loading/Loading.jsx';
import Channels from '../../components/Chat/Channels.jsx';
import ChatContent from '../../components/Chat/ChatContent.jsx';

const Chat = () => {
  const data = useSelector((store) => store.data);
  const socket = useSocket();

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow border">
      <div className="row h-100">
        <div className="col-2 bg-light">
          <Channels socket={socket} channels={data.channels} />
        </div>
        <div className="col-10 h-100">
          <ChatContent socket={socket} messages={data.messages} />
        </div>
      </div>
      {/* {
        !data.loaded
          ? <Loading />
          : <div>Chant here</div>
      } */}
    </div>
  );
};

export default Chat;
