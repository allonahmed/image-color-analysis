import React from 'react';
import Modal from 'react-modal';
import { ImageSelect } from './ImageSelect';

/**
 * 
 * @returns button that opens image upload modal
 */

const styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    height:'400px',
    width: '600px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: '1px solid #b6b6b6',
    borderRadius: '15px'
  },
  overlay: {
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.25)',
  },
};

//references what app element will be linked to the modal
Modal.setAppElement('#modal');

export const Upload : React.FunctionComponent = () => {
  let subtitle : HTMLElement | null;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  //example for reference
  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle ? subtitle.style.color = '#f00' : null;
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={styles}
        contentLabel="Example Modal"
        appElement={document.getElementById('root') as HTMLElement}
      >
        <ImageSelect />
      </Modal>
    </div>
  );
};