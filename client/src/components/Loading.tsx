import React from "react";
import { useSelector } from "react-redux";

import '../styles/loading.css'

export const Loading: React.FC = () => {
    const status = useSelector((state: any) => state.system.loading)
    return (
        <div className="loading-container" style={{ display: status ? 'flex' : 'none' }}>
            <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
} 