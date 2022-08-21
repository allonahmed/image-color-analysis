//for requesting data from api then sending to our own db
import axios from 'axios';

export const UploadSneaker = async () => {
  const options = {
    method: 'GET',
    url: 'https://the-sneaker-database.p.rapidapi.com/sneakers',
    params: {limit: '100', page: '10', brand: 'jordan'},
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API || '',
      'X-RapidAPI-Host': 'the-sneaker-database.p.rapidapi.com'
    }
  };
  await axios.request(options).then(function (response) {
    console.log(response.data.results);
    axios.post('http://localhost:2020/upload-sneakers/', response.data.results).then((res)=> console.log('response:',res));
  }).catch(function (error) {
    console.error(error);
  });
};