import React, { useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useSocket } from '../../../context/ProvideSocket.jsx';
import { closeModal } from '../../../redux/slices/modal';
import { changeActiveChannel } from '../../../redux/slices/channels';

const useHandlers = () => {
  const socket = useSocket();
  const dispatch = useDispatch();

  const removeChannel = (id) => {
    socket.emit('removeChannel', { id }, () => {
      dispatch(closeModal());
    });
  };

  const addChannel = (_, name) => {
    socket.emit('newChannel', { name }, ({ data }) => {
      dispatch(changeActiveChannel(data.id));
      dispatch(closeModal());
    });
  };

  const renameChannel = (id, name) => {
    socket.emit('renameChannel', { id, name }, () => {
      dispatch(closeModal());
    });
  };

  return {
    removeChannel,
    addChannel,
    renameChannel,
  };
};

const useModalProperties = (type) => {
  const handlers = useHandlers();
  const { t } = useTranslation();

  const modalsProperties = {
    addChannel: {
      title: t('modal.addTitle'),
      submit: handlers.addChannel,
      button: t('modal.submit.add'),
      testId: 'add-channel',
      type: 'form',
    },
    renameChannel: {
      title: t('modal.renameTitle'),
      submit: handlers.renameChannel,
      button: t('modal.submit.rename'),
      testId: 'rename-channel',
      type: 'form',
    },
    removeChannel: {
      title: t('modal.removeTitle'),
      submit: handlers.removeChannel,
      button: t('modal.submit.remove'),
      type: 'confirmation',
    },
  };

  return modalsProperties[type];
};

const InputForm = ({ inputRef, testId }) => (
  <Form>
    <Field
      autoComplete="off"
      data-testid={testId}
      innerRef={inputRef}
      className="form-control"
      type="text"
      name="channelName"
    />
  </Form>
);

const ModalComponent = (modalProperties, ref) => {
  const useModalComponent = ({ handleSubmit }) => {
    const dispatch = useDispatch();
    const modalState = useSelector((state) => state.modal);
    const { t } = useTranslation();

    return (
      <Modal show={modalState.isOpened} onHide={() => dispatch(closeModal())}>
        <Modal.Header closeButton>
          <Modal.Title>{modalProperties?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            modalProperties?.type === 'form'
              ? <InputForm inputRef={ref} testId={modalProperties.testId} />
              : <div>{t('chat.confirmRemove')}</div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch(closeModal())}>
            {t('modal.close')}
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {modalProperties?.button}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return useModalComponent;
};

const ChannelsModal = () => {
  const modalState = useSelector((state) => state.modal);
  const inputRef = useRef(null);
  const modalProperties = useModalProperties(modalState.type);

  const onSubmit = ({ channelName }, formikHelpers) => {
    modalProperties.submit(modalState.channelId, channelName);
    formikHelpers.resetForm();
  };

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [modalState.isOpened]);

  return (
    <Formik
      initialValues={{ channelName: modalState?.channelName || '' }}
      onSubmit={onSubmit}
      component={ModalComponent(modalProperties, inputRef)}
    />
  );
};

export default ChannelsModal;
