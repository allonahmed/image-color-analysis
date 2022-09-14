import React, {  useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper';
import { ImageData } from '../../types';
import { MdNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
import { useAppDispatch } from '../../hooks';
import store from '../../redux/store';

// import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css';
import { updateLoading } from '../../redux/reducers/system';
import { fetchImageType, updatedRelated, updateImage, updateImageColors, updateImageData } from '../../redux/reducers/image';
import { getRelated } from '../../api/testapi';
import { UploadImage } from '../../api/uploadImage';


type Props = {
  data: ImageData[] 
}
export const Relateable : React.FunctionComponent<Props> = ({ data }) => {
  const prev = useRef(null), next = useRef(null);
  const loading = store.getState().system.loading;
  const dispatch = useAppDispatch();

  const setImage = (image: any) => {
    return image || 'data:image/png;base64,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';
  };

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
        mousewheel={true}
        modules={[Navigation, Mousewheel]}>
        {data.map((item: ImageData, id: number)=> {
          return (
            <SwiperSlide 
              key={id}
              className='slide noselect'
              onClick={async ()=> {
                if (item){
                  dispatch(updateLoading(true));
                  await getRelated(item.silhouette, item.sku).then((resp)=> {
                    dispatch(updatedRelated(resp));
                  });
                  dispatch(updateImageData(item));
                  dispatch(updateImage(item?.thumbnail_image));
                  await UploadImage(item.thumbnail_image).then((res) => {
                    dispatch(updateImageColors(res));
                    dispatch(updateLoading(false));
                    dispatch(fetchImageType(item.thumbnail_image));
                  });
                  dispatch(updateLoading(false));
                }
              }}
            >
              <img src={setImage(item?.thumbnail_image)}/>
              <p>{item?.name}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
    : <div className='swiper-container'></div>;
};