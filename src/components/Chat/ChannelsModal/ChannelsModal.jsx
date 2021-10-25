import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useSocket } from '../../../context/ProvideSocket';
import { closeModal } from '../../../redux/actions/modal';
import { addChannel, changeActiveChannel, removeChannel, renameChannel } from '../../../redux/actions/data';
import { useEffect, useRef } from 'react';

const ChannelsModal = () => {
  const { t } = useTranslation();
  const handleRemoveChannel = (id) => () => {
    socket.emit('removeChannel', { id }, () => {
      socket.once('removeChannel', () => {
        dispatch(removeChannel(id));
        dispatch(changeActiveChannel(1));
        dispatch(closeModal())
      })
    })
  };
  
  const handleAddChannel = () => (name) => {  
    socket.emit('newChannel', { name }, () => {
      socket.once('newChannel', (channel) => {
        dispatch(addChannel(channel));
        dispatch(changeActiveChannel(channel.id));
        dispatch(closeModal());
      });
    });
  };
  
  const handleRenameChannel = (id) => (name) => {
    socket.emit('renameChannel', { id, name }, () => {
      socket.once('renameChannel', (channel) => {
        dispatch(renameChannel(id, name));
        dispatch(changeActiveChannel(channel.id));
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
      testid: 'add-channel'
    },
    renameChannel: {
      title: t('modal.renameTitle'),
      submit: handleRenameChannel,
      button: t('modal.submit.rename'),
      type: 'form',
      testid: 'rename-channel',
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
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [])

  const modalProperties = getModalProperties[modalState.type]
    || { title: '', button: '', type: '', submit: () => {} };

  const onSubmit = ({ channelName }) => {
    console.log(channelName);
    modalProperties.submit(modalState.data?.channelId)(channelName);
  };

  console.log("channelName", modalState.data?.channelName);

  return (
    <Formik
      initialValues={{ channelName: modalState.data?.channelName || '' }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, handleChange, values }) => (
        <Modal show={modalState.isOpened} onHide={() => dispatch(closeModal())}>
          <Modal.Header closeButton>
            <Modal.Title>{modalProperties.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              modalProperties.type === 'form'
                ? <Form>
                  <Field
                    innerRef={inputRef}
                    className="form-control"
                    data-testid={modalProperties.testid}
                    type="text"
                    name="channelName"
                  />
                </Form>
                : <div>{t('chat.confirmRemove')}</div>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => dispatch(closeModal())}>
              {t('modal.close')}
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {modalProperties.button}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
};

export default ChannelsModal;
