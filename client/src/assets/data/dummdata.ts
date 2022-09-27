import axios from 'axios';

export const generateDummyClothes = async (limit: number) => {
  await axios.get('https://api.escuelajs.co/api/v1/categories/1/products')
    .then(res=>console.log(res.data)).catch(err=> console.log(err));
};