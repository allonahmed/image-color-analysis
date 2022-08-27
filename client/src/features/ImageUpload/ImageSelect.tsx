import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { SelectOptions } from './SelectOptions';

import '../../styles/imageupload.css';

/**
 * 
 * @returns modal for image selecting 
 */

type Props = {
  closeModal: ()=> void
}

export const ImageSelect : React.FunctionComponent<Props> = ({ closeModal }) => {
  const [currentNav, setNav] = useState<string>('Upload');
  const [image, setImage] = useState<File[] | null>(null);

  const Navigation : React.FunctionComponent = () => {
    return (
      <div className='modal-navigation'>
        {['Upload', 'URL', 'Camera', 'Stock'].map((item, id: number) => {
          return (
            <button 
              key={id} 
              onClick={()=>setNav(item)}
              className={item === currentNav ? 
                'modal-navigation-links active-link' : 
                'modal-navigation-links'}
            >
              {item}
            </button> 
          );
        })}
      </div>
    );
  };

  const Header : React.FunctionComponent = () => {
    return (
      <div className='modal-header'>
        <IoMdClose 
          className='modal-exit-button'
          onClick={closeModal}
        />
        <h3> Select Image </h3>
      </div>
    );
  };

  return (
    <div className='modal-container'>
      <Header />
      <Navigation />
      <SelectOptions setImage={setImage} image={image} type={currentNav}/>
    </div>
  );
};
