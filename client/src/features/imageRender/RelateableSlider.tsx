import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
// import Swiper styles
import 'swiper/css/thumbs';
import 'swiper/css';


export const Relateable = () => {
  return (
    <div color='green' style={{width:'100%'}}>
      <Swiper 
        slidesPerView={3}  
        spaceBetween={30} 
        pagination={{
          'clickable': true
        }} 
        className="mySwiper" 
        modules={[Pagination]}>
        {[0,0,0,0,0,0,0,0].map((_,id)=> {
          return (
            <SwiperSlide 
              key={id}
              className='slide noselect'
            >
              slide {id + 1}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};