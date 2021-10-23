import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { changeActiveChannel } from '../../redux/actions/data';
import {
  addChannelModal,
  removeChannelModal,
  renameChannelModal,
} from '../../redux/actions/modal';

const Channels = ({ channels, socket }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentChannelId } = useSelector((state) => state.data);

  const renderButton = (channel) => {
    const variant = cn({
      primary: currentChannelId === channel.id,
      light: currentChannelId !== channel.id,
    });

    if (!channel.removable) return (
      <Button
        onClick={() => dispatch(changeActiveChannel(channel.id))}  
        className="w-100"
        variant={variant}
      >{channel.name}</Button>
    )

    return (
      <Dropdown className="w-100" as={ButtonGroup}>
        <Button
          onClick={() => dispatch(changeActiveChannel(channel.id))}  
          variant={variant}
          className="w-100"
        >{channel.name}</Button>

        <Dropdown.Toggle split variant={variant} id="dropdown-split-basic" />

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => dispatch(renameChannelModal({ channelId: channel.id }))}
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
    )
  };

  const renderChannel = (channel) => {
    return (
      <li
        className="w-100 nav-item border-0"
        key={channel.name + channel.id}
        role="presentation"
      >
        { renderButton(channel) }
      </li>
    );
  };

  return (
    <div className="h-100 my-2">
      <h5>Channels:</h5>
      <ul className="nav">
        { channels.map(renderChannel) }
      </ul>
      <Button
        onClick={() => dispatch(addChannelModal({ channelId: null }))}
        className="btn btn-secondary"
      >
        {t('chat.addChannel')}
      </Button>
    </div>
  );
};

export default Channels;
