import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { ImageData } from '../../types';
// import Swiper styles
import 'swiper/css/thumbs';
import 'swiper/css';

type Props = {
  data: ImageData[] 
}
export const Relateable : React.FunctionComponent<Props> = ({ data }) => {

  return (
    <div className='swiper-container'>
      <h4>Related Sneakers</h4>
      <Swiper 
        slidesPerView={3}  
        spaceBetween={30} 
        pagination={{
          'clickable': true
        }} 
        className="mySwiper" 
        modules={[Pagination]}>
        {data.map((item: ImageData, id: number)=> {
          return (
            <SwiperSlide 
              key={id}
              className='slide noselect'
            >
              <img src={item?.thumbnail_image}/>
              <p>{item?.name}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};