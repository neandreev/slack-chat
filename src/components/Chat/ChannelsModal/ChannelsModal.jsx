import { useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useSocket } from '../../../context/ProvideSocket.jsx';
import { closeModal } from '../../../redux/actions/modal';
import { changeActiveChannel } from '../../../redux/actions/data';

const ChannelsModal = () => {
  const socket = useSocket();
  const { t } = useTranslation();
  const modalState = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleRemoveChannel = (id) => () => {
    socket.emit('removeChannel', { id }, () => {
      dispatch(changeActiveChannel(1));
      dispatch(closeModal());
    });
  };

  const handleAddChannel = () => (name) => {
    socket.emit('newChannel', { name }, ({ data }) => {
      dispatch(changeActiveChannel(data.id));
      dispatch(closeModal());
    });
  };

  const handleRenameChannel = (id) => (name) => {
    socket.emit('renameChannel', { id, name }, () => {
      dispatch(closeModal());
    });
  };

  const getModalProperties = (type) => ({
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
  }[type]);

  const modalProperties = getModalProperties(modalState.type);

  const onSubmit = ({ channelName }, helpers) => {
    modalProperties.submit(modalState.data?.channelId)(channelName);
    helpers.resetForm();
  };

  const InputForm = () => (
    <Form>
      <Field
        autoComplete="off"
        innerRef={inputRef}
        className="form-control"
        type="text"
        name="channelName"
      />
    </Form>
  );

  return (
    <Formik
      initialValues={{ channelName: modalState.data?.channelName || '' }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <Modal show={modalState.isOpened} onHide={() => dispatch(closeModal())}>
          <Modal.Header closeButton>
            <Modal.Title>{modalProperties.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              modalProperties.type === 'form'
                ? <InputForm />
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
