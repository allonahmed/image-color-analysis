import axios from 'axios';

//get all data from sneaker db table
export const GetAll = async () => {
  await axios.get('http://localhost:2020/get-all').
    then((res) => console.table(res.data)).
    catch(err => console.log(err.message));
};