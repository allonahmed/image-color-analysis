import React from 'react';
import Modal from 'react-modal';
import { ImageSelect } from './ImageSelect';
import { IoImagesOutline } from 'react-icons/io5';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { updateModal } from '../../redux/reducers/system';

import '../../styles/imageupload.css';

/**
 * @returns button that opens image upload modal
 */

//references what app element will be linked to the modal
Modal.setAppElement('#modal');

export const Upload : React.FunctionComponent = () => {
  let subtitle : HTMLElement | null;
  const isOpen = useAppSelector(state=>state.system.modalOpen);
  const dispatch = useAppDispatch();

  const openModal = () => {
    dispatch(updateModal(true));
  };
  const closeModal = () => {
    dispatch(updateModal(false));
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
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={styles}
      >
        <ImageSelect closeModal={closeModal}/>
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
    border: 'none',
    boxShadow:'0 0 20px #0000006e',
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