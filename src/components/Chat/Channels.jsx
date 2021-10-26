import cn from 'classnames';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  addChannelModal,
  removeChannelModal,
  renameChannelModal,
} from '../../redux/actions/modal';
import {
  addChannel,
  removeChannel,
  renameChannel,
  changeActiveChannel,
} from '../../redux/actions/data';
import { useSocket } from '../../context/ProvideSocket.jsx';

const Channels = ({ channels }) => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentChannelId } = useSelector((state) => state.data);

  useEffect(() => {
    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
    });

    socket.on('renameChannel', ({ id, name }) => {
      dispatch(renameChannel(id, name));
    });

    socket.on('removeChannel', ({ id }) => {
      dispatch(removeChannel(id));
    });

    return () => socket.removeAllListeners();
  }, []);

  useEffect(() => {
    socket.on('removeChannel', ({ id }) => {
      if (currentChannelId === id) {
        dispatch(changeActiveChannel(1));
      }
    });
  }, [currentChannelId]);

  const renderButton = (channel) => {
    const variant = cn({
      primary: currentChannelId === channel.id,
      light: currentChannelId !== channel.id,
    });

    if (!channel.removable) {
      return (
        <Button
          onClick={() => dispatch(changeActiveChannel(channel.id))}
          className="w-100 text-start"
          variant={variant}
        >
          {channel.name}
        </Button>
      );
    }

    const handleRenameChannel = () => (
      dispatch(renameChannelModal({ channelName: channel.name, channelId: channel.id }))
    );

    return (
      <Dropdown className="w-100 d-flex" as={ButtonGroup}>
        <Button
          onClick={() => dispatch(changeActiveChannel(channel.id))}
          variant={variant}
          className="w-100 text-start text-truncate"
        >
          {channel.name}
        </Button>

        <Dropdown.Toggle split variant={variant} id="dropdown-split-basic" />

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={handleRenameChannel}
          >
            {t('chat.rename')}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => dispatch(removeChannelModal({ channelId: channel.id }))}
          >
            {t('chat.remove')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const renderChannel = (channel) => (
    <li
      className="w-100 nav-item border-0"
      key={channel.name + channel.id}
      role="presentation"
    >
      { renderButton(channel) }
    </li>
  );

  return (
    <div className="h-100 d-flex flex-column">
      <div className="channels-header">
        <h5 className="mt-2">
          {t('chat.channels')}
          :
        </h5>
      </div>
      <div className="flex-fill">
        <div className="h-100 d-flex flex-column justify-content-between">
          <ul className="nav nav-pills nav-fill">
            { channels.map(renderChannel) }
          </ul>
          <Button
            onClick={() => dispatch(addChannelModal({ channelId: null }))}
            className="btn btn-secondary mb-3"
          >
            {t('chat.addChannel')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Channels;
