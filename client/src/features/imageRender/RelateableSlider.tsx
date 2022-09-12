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
    <div color='green' style={{width:'100%'}}>
      <Swiper 
        slidesPerView={3}  
        spaceBetween={30} 
        pagination={{
          'clickable': true
        }} 
        className="mySwiper" 
        modules={[Pagination]}>
        {data.map((item: ImageData,id: number)=> {
          return (
            <SwiperSlide 
              key={id}
              className='slide noselect'
            >
              <img src={item?.thumbnail_image}/>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};