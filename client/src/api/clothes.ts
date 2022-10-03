import axios from 'axios';

export const getGymShark = async () => {
  return await axios.get('http://localhost:2020/get-gym-shark').then((res) => res).
    catch(err => console.log(err));
};
