import React from 'react';
import styled from 'styled-components';
import '../styles/inputimage.css'


const StyledInput = styled.input`
    padding: max(200px, 20%) max(200px, 20%);
    border: 3px solid #000;
    &::file-selector-button {
        display: none;
    }
    -webkit-appearance:none;
`

export const InputImage = () => {
    return (
        <div className="fileupload">
            <input type="file" />
            Any content here, perhaps button text
        </div>
    )
}