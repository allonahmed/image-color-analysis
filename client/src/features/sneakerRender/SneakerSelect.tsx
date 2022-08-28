import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiCheck, FiX as DeleteQuery, FiSearch as SearchIcon} from 'react-icons/fi';

import '../../styles/sneakerselect.css';

export const SneakerSelect: React.FunctionComponent = () => {
  const [options, setOptions] = useState<any>(null);
  const [selection, setSelection] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  useEffect(()=>{
    axios.post('http://localhost:2020/get-sneakers', {query}).then((res)=>{
      console.log(res.data);
      setOptions(res.data);
    });
    console.log(options);
  },[query]);

  return (  
    <div className='sneaker-selection-container'>
      <div className='sneaker-selection-input-container'>
        <SearchIcon className='input-search-icon' color={'black'}/>
        <input 
          type='text' 
          value={query} 
          onChange={(e)=> setQuery(e.target.value)} 
          className='sneaker-selection-input'
          placeholder='Search through 6600+ jordans...'
        /> 
        <DeleteQuery 
          className='input-delete-icon'
          style={{display: query.length > 0 ? 'block' : 'none'}} 
          onClick={()=>setQuery('')}
        />
      </div>

      <div className='options-container'>
        {query.length> 0 &&
          options && options.map((item:any, id: number)=> {
          return (
            <div 
              key={id}
              className='options-item'
              style={{ display: 'flex', alignItems:'center',}}
              onClick={()=> { setSelection(item); }}
            >
              <img src={item.thumbnail_image} style={{height: '165px', width: '150px', marginRight:'5px'}}/>
              <div style={{display: 'flex', flexDirection:'column',alignItems:'flex-start'}}>
                <h3 >{item.brand}</h3>
                <h1 >{item.name}</h1>
                <h2 >{item.silhouette}</h2>
              </div>
              {selection && (item.sku === selection.sku && <FiCheck style={{position: 'absolute', right: '20px', height: '40px', width: '40px'}}/>)}
            </div>
          );
        })}
      </div>
    </div>
  );
};