import axios from 'axios';

export const getGymShark = async () => {
  return await axios.get('http://localhost:8000/get-gym-shark').
    then((res)=> res.data).catch((err)=> {
      console.log(err);
      return null;
    });
};

