import axios from 'axios';

//get all data from sneaker db table
export const GetAll = async () => {
  await axios.get('http://localhost:2020/get-all').
    then((res) => console.table(res.data)).
    catch(err => console.log(err.message));
};

export const getRelated = async (silhouette: string, sku: string) => {
  return await axios.post('http://localhost:2020/get-related', {
    silhouette: silhouette,
    sku: sku
  }).then((res)=>{
    return res.data;
  }).catch(err=> console.log(err));
};