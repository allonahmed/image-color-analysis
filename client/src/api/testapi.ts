import axios from 'axios'

export const MockApi = async () => {
    await axios.post('/data/create',
        JSON.stringify({ name: "Mike" })
        , {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response: any) => response).then(message => {
            console.log(message);
        }).catch((err) => {
            console.log('error: ', err);
        })
}

export const UploadImage = async (e: any, image: any) => {
    e.preventDefault();
    console.log('image in UploadImage():', image[0])
    const formData = new FormData();

    formData.append('file', image[0])
    console.log(formData)
    return await axios.post('/upload-image',
        formData,
        {
            headers: {
                "Content-type": "multipart/form-data; charset=UTF-8"
            }
        }
    ).then((response: any) => response).then(message => message.data).catch((err) => {
        console.log('error: ', err);
    })
}