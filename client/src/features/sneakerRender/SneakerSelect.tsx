import React, { SyntheticEvent, useEffect, useState } from 'react';
import { FiCheck, FiX as DeleteQuery, FiSearch as SearchIcon} from 'react-icons/fi';
import { useAppDispatch } from '../../hooks';
import { fetchImageType, updateImageData, updateImageColors } from '../../redux/reducers/image';
import { updateLoading } from '../../redux/reducers/system';
import { UploadImage } from '../../api/uploadImage';
import axios from 'axios';

import '../../styles/sneakerselect.css';
 
export const SneakerSelect: React.FunctionComponent = () => {
  const [ options, setOptions ] = useState<any>(null);
  const [ current, setCurrent ] = useState<any>(null);
  const [ openOptions, setOpen ] = useState<boolean>(false);
  const [ query, setQuery ] = useState<string>('');
  const [ focused, setFocused ] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    axios.post('http://localhost:2020/get-sneakers', { query }).then((res)=>{
      setOptions(res.data);
    });
  },[query]);

  //sending image to flask server for image processing 
  const HandleSubmit = (e: SyntheticEvent, item : any) => { 
    e.preventDefault();
    if(item.name.length > 25){
      setQuery(item.name.substring(0,24) + '...');
    } else setQuery(item.name);
    setOpen(false);
    setCurrent(item);
    dispatch(updateImageData(item)); 
    dispatch(updateLoading(true));
    UploadImage(item.thumbnail_image).then((res) => {
      dispatch(updateImageColors(res));
      dispatch(updateLoading(false));
      dispatch(fetchImageType(item.thumbnail_image));
    });
  };

  return (  
    <div className='sneaker-selection-container' >
      <button className='sneaker-selection-input-container'>
        <SearchIcon className='input-search-icon' color={'black'}/>
        { current  && <img src={current.thumbnail_image} className='input-image'/>}
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
            setCurrent(null);
            if(query.includes('.')){
              setQuery(query.replaceAll('.', ''));
            }
          }}
          style={current && {padding: '20px 0px 20px 120px'}}
        />
        
        <DeleteQuery 
          className='input-delete-icon'
          style={{ display: query.length > 0 || current || openOptions ? 'block' : 'none' }} 
          onClick={()=>{
            setQuery('');
            setCurrent(null);
            setOpen(false);
          }}
        />
      </button>
      { 
        openOptions &&
      <div className='options-container'>
        
        {options && options.map((item: any, id: number)=> {
          return (
            <div 
              key={id}
              className='options-item'
              style={{ display: 'flex', alignItems:'center'}}
              onClick={(e) => HandleSubmit(e, item)}
              onMouseEnter={()=>setFocused(true)}
              onMouseLeave={()=>setFocused(false)}
            >
              <img src={item.thumbnail_image} style={{height: '100px', width: '100px', marginRight:'5px'}} className='thumbnail-image'/>
              <div style={{display: 'flex', flexDirection:'column',alignItems:'flex-start'}}>
                <h3 >{item.brand}</h3>
                <h1 >{item.name}</h1>
                <h2 >{item.silhouette}</h2>
              </div>
              {current && (item.sku === current.sku && <FiCheck style={{position: 'absolute', right: '20px', height: '40px', width: '40px'}}/>)}
            </div>
          );
        })}
      </div>
      }
    </div>
  );
};