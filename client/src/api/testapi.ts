import axios from 'axios';

export const MockApi = async () => {
  await axios.post('/data/create',
    JSON.stringify({ name: 'Mike' })
    , {
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then((response) => response).then(message => {
    console.log(message);
  }).catch((err) => {
    console.log('error: ', err);
  });
};

export const GetAll = async () => {
  await axios.get('http://localhost:2020/get-all').then((res) => console.table(res.data)).
    catch(err => console.log(err.message));
};