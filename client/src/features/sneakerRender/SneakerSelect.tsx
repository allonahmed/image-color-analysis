import React, { useEffect, useState } from 'react';
import { FiCheck, FiX as DeleteQuery, FiSearch as SearchIcon} from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateCurrent, updateImage, updateImageColors } from '../../redux/reducers/image';
import { updateLoading } from '../../redux/reducers/system';
import { UploadImage } from '../../api/uploadImage';
import axios from 'axios';

import '../../styles/sneakerselect.css';
 
export const SneakerSelect: React.FunctionComponent = () => {
  const [options, setOptions] = useState<any>(null);
  const [openOptions, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const selection = useAppSelector(state=>state.image.current);

  useEffect(()=>{
    axios.post('http://localhost:2020/get-sneakers', {query}).then((res)=>{
      // console.log(res.data);
      setOptions(res.data);
    });
  },[query]);

  return (  
    <div className='sneaker-selection-container' >
      <button className='sneaker-selection-input-container'>
        <SearchIcon className='input-search-icon' color={'black'}/>
        {selection  && <img src={selection.thumbnail_image} className='input-image'/>}
        <input 
          type='text' 
          value={query} 
          onChange={(e)=> {
            setQuery(e.target.value);
          }} 
          onBlur={()=> { 
            if(focused === false)
              setOpen(false);
          }}
          onFocus={()=> setOpen(true)}
          className='sneaker-selection-input'
          placeholder='Search through 6600+ jordans...'
          onClick={()=>{
            dispatch(updateCurrent( null));
            if(query.includes('.')){
              setQuery(query.replaceAll('.', ''));
            }
          }}
          style={selection && {padding: '20px 0px 20px 120px'}}
        />
        
        <DeleteQuery 
          className='input-delete-icon'
          style={{display: query.length > 0 || selection || openOptions ? 'block' : 'none'}} 
          onClick={()=>{
            setQuery('');
            dispatch(updateCurrent( null));
            setOpen(false);
          }}
        />
      </button>
      {openOptions &&
      <div className='options-container'>
        
        {options && options.map((item:any, id: number)=> {
          return (
            <div 
              key={id}
              className='options-item'
              style={{ display: 'flex', alignItems:'center'}}
              onClick={(e)=> { 
                e.preventDefault();
                if(item.name.length > 25){
                  setQuery(item.name.substring(0,24) + '...');
                } else setQuery(item.name);
                setOpen(false);
                dispatch(updateCurrent(item));
                dispatch(updateLoading(true));
                UploadImage(item.thumbnail_image).then((res) => {
                  dispatch(updateImageColors(res));
                  dispatch(updateLoading(false));
                  dispatch(updateImage(item.thumbnail_image));
                });
              }}
              onMouseEnter={()=>setFocused(true)}
              onMouseLeave={()=>setFocused(false)}
            >
              <img src={item.thumbnail_image} style={{height: '100px', width: '100px', marginRight:'5px'}} className='thumbnail-image'/>
              <div style={{display: 'flex', flexDirection:'column',alignItems:'flex-start'}}>
                <h3 >{item.brand}</h3>
                <h1 >{item.name}</h1>
                <h2 >{item.silhouette}</h2>
              </div>
              {selection && (item.sku === selection.sku && <FiCheck style={{position: 'absolute', right: '20px', height: '40px', width: '40px'}}/>)}
            </div>
          );
        })}
      </div>}
    </div>
  );
};