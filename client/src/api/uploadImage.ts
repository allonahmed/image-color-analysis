import axios from 'axios';
import React from 'react';

export const UploadImage = async (e: React.FormEvent<HTMLFormElement>, image: File[]| null) => {
  e.preventDefault();
  if(image){
    console.log('image in UploadImage():', image[0]);
    const formData = new FormData();

    formData.append('file', image[0]);
    console.log(formData);
    return await axios.post('/upload-image',
      formData,
      {
        headers: {
          'Content-type': 'multipart/form-data; charset=UTF-8'
        }
      }
    ).then((response) => response).then(message => message.data).catch((err) => {
      console.log('error: ', err);
    });
  }else console.log('no image selected');
};