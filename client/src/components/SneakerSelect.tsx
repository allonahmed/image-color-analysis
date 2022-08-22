import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiChevronUp, FiChevronDown, FiCheck, FiX, FiSearch } from 'react-icons/fi';

import '../styles/sneakerselect.css';

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
      {/* <div className='sneaker-selection-select' onClick={()=>setOpen(!open)}>
        {selection ? 
          <img src={selection.thumbnail_image} className="sneaker-selection-input-img"/> : 
          <img src={'https://cdn3.iconfinder.com/data/icons/sport-equipment-outline/512/as407_3_1-512.png'} className='sneaker-selection-input-img'/>}
        <h3>{selection ? selection.name : 'select an item'}</h3>
        <div className='arrow-container'>
          {open ? <FiChevronDown style={{height: '40px', width: '40px'}} /> : <FiChevronUp style={{height: '40px', width: '40px'}}/>}
        </div>
      </div> */}
      <div className='sneaker-selection-input-container'>
        <div style={{position:'absolute', left: '10px', top: '10px'}}><FiSearch style={{color: '#000', height: '30px', width: '30px'}}/></div>
        <input type='text' value={query} onChange={(e)=> setQuery(e.target.value)} className='sneaker-selection-input'/>
        <div style={{position:'absolute', right: '15px', top: '15px'}}><FiX style={{color: '#000', height: '20px', width: '20px'}} onClick={()=>setQuery('')}/></div>
      </div>
      <div className='options-container'>
        {
          query.length> 0 &&
          options && options.map((item:any, id: number)=> {
            return (
              <div 
                key={id}
                className='options-item'
                style={{ display: 'flex', alignItems:'center',}}
                onClick={()=> {setSelection(item);}}
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
          })
        }
      </div>
    </div>
  );
};