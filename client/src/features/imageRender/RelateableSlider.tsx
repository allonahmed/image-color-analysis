import React, {  useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { ImageData } from '../../types';
import { MdNavigateBefore, MdOutlineNavigateNext} from 'react-icons/md';
// import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css';
import store from '../../redux/store';

type Props = {
  data: ImageData[] 
}
export const Relateable : React.FunctionComponent<Props> = ({ data }) => {
  const prev = useRef(null), next = useRef(null);
  const loading = store.getState().system.loading;

  return !loading ?
    <div className='swiper-container'>
      <div className='swiper-header'>
        <h4 className='noselect'>Related Sneakers</h4>
        <div className='button-container'>
          <div className='prev button' ref={prev}>
            <MdNavigateBefore className='button-icon'/>
          </div>
          <div className='next button'ref={next}>
            <MdOutlineNavigateNext className='button-icon' />
          </div>
        </div>
      </div>
      <Swiper 
        slidesPerView={3}  
        spaceBetween={30} 
        onBeforeInit={(swiper: any) => {
          swiper.slideTo(0);
          swiper.params.navigation.prevEl = prev.current;
          swiper.params.navigation.nextEl = next.current;
          swiper.navigation.destroy();
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        onUpdate={(swiper)=> swiper.slideTo(0)}
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
      </Swiper>
    </div>
    : <div></div>;
};