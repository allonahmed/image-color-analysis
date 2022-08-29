import axios from 'axios';


export const UploadImage = async (image: any, e?: React.FormEvent<HTMLFormElement>) => {
  e && e.preventDefault();
  if(image){
    //for images from db... we convert to file before sending to server
    if(typeof image === 'string'){
      await fetch(image)
        .then(async response => {
          const contentType: any = response.headers.get('content-type');
          const blob = await response.blob();
          console.log(blob);
          image  =[new File([blob], 'fileName.jpg')];
          console.log(image);
        });
    }
    const formData = new FormData();

    formData.append('file', image[0]);
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