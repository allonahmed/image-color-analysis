import React from 'react';
import Modal from 'react-modal';
import { ImageSelect } from './ImageSelect';
import { IoImagesOutline } from 'react-icons/io5';
import { useAppSelector } from '../../hooks';

import '../../styles/imageupload.css';

/**
 * 
 * @returns button that opens image upload modal
 */

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
    <div className='modal-button-container'>
      <button onClick={openModal} className='modal-button'>
        Select Image
        <IoImagesOutline className='modal-image-button'/>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={styles}
        appElement={document.getElementById('root') as HTMLElement}
      >
        <ImageSelect closeModal={()=>setIsOpen(false)}/>
      </Modal>
    </div>
  );
};

const styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    flex: 1,
    width: '500px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: '1px solid #b6b6b6',
    boxShadow:'0 0 20px #4a4a4a6f',
    borderRadius: '15px',
  },
  overlay: {
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.5)',
  },
};