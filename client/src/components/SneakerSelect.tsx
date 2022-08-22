import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

export const SneakerSelect: React.FunctionComponent = () => {
  const [options, setOptions] = useState<any>(null);
  const [selection, setSelection] = useState<any>(null);

  useEffect(()=>{
    axios.get('http://localhost:2020/get-sneakers').then((res)=>{
      setOptions(res.data);
    });
  },[]);

  return (  
    <div style={{color: '#fff', padding: '20px 0'}}>
      <label htmlFor='sneakers'>pick a sneaker</label>
      <div >
        {
          options && options.map((item:any, id: number)=> {
            return (
              <div 
                key={id}
                style={{padding: '10px 0', display: 'flex', alignItems:'center', paddingLeft: '5%'}}
              >
                <img src={item.original_image} style={{height: '160px', width: '160px', marginRight:'5px'}}/>
                <div style={{display: 'flex', flexDirection:'column',alignItems:'flex-start'}}>
                  <h3 style={{color: '#fff'}}>{item.brand}</h3>
                  <h1 style={{color: '#fff'}}>{item.name}</h1>
                  <h2 style={{color: '#fff'}}>{item.silhouette}</h2>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};