import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
    return (
        <div className='ma3 flex-center'>
            <div>
                <img className='shadow-5 br2' src={imageUrl} alt='' width='500px' height='auto' />
            </div>
        </div>
    );
}

export default FaceRecognition;