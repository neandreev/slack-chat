import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useSocket } from '../../../context/ProvideSocket';
import { closeModal } from '../../../redux/actions/modal';
import { addChannel, changeActiveChannel, removeChannel, renameChannel } from '../../../redux/actions/data';

const ChannelsModal = () => {
  const { t } = useTranslation();
  const handleRemoveChannel = (channelId) => () => {
    socket.emit('removeChannel', { id: channelId }, (response) => {
      socket.once('removeChannel', () => {
        dispatch(removeChannel(channelId));
        dispatch(changeActiveChannel(1));
        dispatch(closeModal())
      })
    })
  };
  
  const handleAddChannel = () => (name) => {  
    socket.emit('newChannel', { name }, (response) => {
      socket.once('newChannel', (channel) => {
        dispatch(addChannel(channel));
        dispatch(changeActiveChannel(channel.id));
        dispatch(closeModal());
      });
    });
  };
  
  const handleRenameChannel = (channelId) => (name) => {
    socket.emit('renameChannel', { id: channelId, name }, (response) => {
      socket.once('renameChannel', (channel) => {
        dispatch(renameChannel(channelId, name));
        dispatch(changeActiveChannel(channelId));
        dispatch(closeModal());
      });
    });
  };

  const getModalProperties = {
    addChannel: {
      title: t('modal.addTitle'),
      submit: handleAddChannel,
      button: t('modal.submit.add'),
      type: 'form',
    },
    renameChannel: {
      title: t('modal.renameTitle'),
      submit: handleRenameChannel,
      button: t('modal.submit.rename'),
      type: 'form',
    },
    removeChannel: {
      title: t('modal.removeTitle'),
      submit: handleRemoveChannel,
      button: t('modal.submit.remove'),
      type: 'confirmation',
    },
  };

  const modalState = useSelector((state) => state.modal);
  const socket = useSocket();
  const dispatch = useDispatch();

  const modalProperties = getModalProperties[modalState.type]
    || { title: '', button: '', type: '', submit: () => {} };

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    onSubmit: ({ channelName }) => {
      modalProperties.submit(modalState.data?.channelId)(channelName);
      formik.resetForm();
    },
  });

  return (
    <Modal show={modalState.isOpened} onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{modalProperties.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          modalProperties.type === 'form'
            ? <form onSubmit={formik.handleSubmit}>
                <input
                  type="text"
                  name="channelName"
                  value={formik.values.channelName}
                  onChange={formik.handleChange}
                />
              </form>
            : <div>{t('chat.confirmRemove')}</div>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(closeModal())}>
          {t('modal.close')}
        </Button>
        <Button variant="primary" onClick={formik.handleSubmit}>
          {modalProperties.button}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChannelsModal;
