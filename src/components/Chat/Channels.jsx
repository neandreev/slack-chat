import cn from 'classnames';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../redux/slices/modal';
import {
  addChannel,
  removeChannel,
  renameChannel,
  changeActiveChannel,
} from '../../redux/slices/channels';
import { useSocket } from '../../context/ProvideSocket.jsx';

const socketsEffect = ({ socket, dispatch }) => {
  socket.on('newChannel', (channel) => {
    dispatch(addChannel({ channel }));
  });

  socket.on('renameChannel', ({ id, name }) => {
    dispatch(renameChannel({ id, name }));
  });

  socket.on('removeChannel', ({ id }) => {
    dispatch(removeChannel({ id }));
  });

  return () => socket.removeAllListeners();
};

const addModal = () => openModal({
  channelId: null,
  type: 'addChannel',
});

const removeModal = ({ id }) => openModal({
  channelId: id,
  type: 'removeChannel',
});

const renameModal = ({ name, id }) => openModal({
  channelName: name,
  channelId: id,
  type: 'renameChannel',
});

const UnremovableButton = ({ variant, channel }) => {
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() => dispatch(changeActiveChannel(channel.id))}
      className="w-100 text-start"
      variant={variant}
    >
      {channel.name}
    </Button>
  );
};

const RemovableButton = ({ variant, channel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleRenameChannel = () => {
    dispatch(renameModal(channel));
  };

  const handleRemoveChannel = () => {
    dispatch(removeModal(channel));
  };

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
        <Dropdown.Item onClick={handleRenameChannel}>
          {t('chat.rename')}
        </Dropdown.Item>
        <Dropdown.Item onClick={handleRemoveChannel}>
          {t('chat.remove')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const ChannelButton = ({ channel }) => {
  const { currentChannelId } = useSelector((state) => state.channels);

  const variant = cn({
    primary: currentChannelId === channel.id,
    light: currentChannelId !== channel.id,
  });

  if (!channel.removable) {
    return <UnremovableButton variant={variant} channel={channel} />;
  }

  return <RemovableButton variant={variant} channel={channel} />;
};

const Channel = ({ channel }) => (
  <li
    className="w-100 nav-item border-0"
    role="presentation"
  >
    <ChannelButton channel={channel} />
  </li>
);

const ChannelsList = ({ channels }) => (
  <ul className="nav nav-pills nav-fill">
    {
      channels
        .map((channel) => <Channel key={channel.name} channel={channel} />)
    }
  </ul>
);

const Channels = () => {
  const socket = useSocket();
  const { channelsList } = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => { socketsEffect({ socket, dispatch }); }, []);

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
          <ChannelsList channels={channelsList} />
          <Button
            onClick={() => dispatch(addModal())}
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
