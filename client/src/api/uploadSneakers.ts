//for requesting data from api then sending to our own db
import axios from 'axios';


// let num = 30;

// export const UploadSneaker =  setInterval(() => {
//   console.log('new request', num);
//   const options = {
//     method: 'GET',
//     url: 'https://the-sneaker-database.p.rapidapi.com/sneakers',
//     params: {limit: '100', page: num.toString(), brand: 'jordan'},
//     headers: {
//       'X-RapidAPI-Key': process.env.REACT_APP_API || '',
//       'X-RapidAPI-Host': 'the-sneaker-database.p.rapidapi.com'
//     }
//   };
//   axios.request(options).then(function (response) {
//     console.log(response.data.results);
//     axios.post('http://localhost:2020/upload-sneakers/', response.data.results).then((res)=> console.log('response:',res));
//   }).catch(function (error) {
//     console.error(error);
//   });
//   num++;
//   if(num > 70){
//     clearInterval(UploadSneaker);
//   }
// }, 5500);


