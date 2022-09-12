import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { ImageData } from '../../types';
// import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css';

type Props = {
  data: ImageData[] 
}
export const Relateable : React.FunctionComponent<Props> = ({ data }) => {
  const prev = useRef(null), next = useRef(null);
  return (
    <div className='swiper-container'>
      <h4>Related Sneakers</h4>
      <Swiper 
        slidesPerView={3}  
        spaceBetween={30} 
        onBeforeInit={(swiper: any) => {
          swiper.params.navigation.prevEl = prev.current;
          swiper.params.navigation.nextEl = next.current;
        }}
        navigation={{
          prevEl: prev.current,
          nextEl: next.current
        }}
        className="mySwiper" 
        modules={[Navigation]}>
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
        <div className='prev' ref={prev}>prev</div>
        <div className='next'ref={next}>next</div>
      </Swiper>
    </div>
  );
};