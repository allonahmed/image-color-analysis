import React from "react";
import { useSelector } from "react-redux";
import store from '../redux/store'


export const DisplayColors: React.FC = () => {

    const colors = useSelector((state: any) => state.image.imageColors)

    const loading = useSelector((state: any) => state.system.loading)

    console.log('loading status:', loading);

    return (
        <div>
            {loading ? <p style={{ color: '#fff' }}>loading</p> : <p>fjfjf</p>}
        </div>
    )
}