import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({inputChange}) => {
    return (
        <div>
            <p className='f5'>{'This app will detect faces from any image you given. Give it a try.'}</p>
            <div className='flex-center'>
                <div className='form flex-center pa4 br2 shadow-5'>
                    <input className='f5 pa2 w-70' onChange={inputChange} type='text' placeholder='Image link'/>
                    <a className="f5 w-30 link grow pa2 br2 white bg-dark-blue" href="#0">Detect</a>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;