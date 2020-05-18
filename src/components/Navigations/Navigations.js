import React from 'react';

const Navigation = ({ onStateChange }) => {
    return (
        <div className='App' style={{display: 'flex', justifyContent: 'flex-end'}}>
            <nav>
                <p onClick={() => onStateChange('signin')} className='f5 link dim black ma3 underline pointer'>Sign Out</p>
            </nav>
        </div>
    );
}

export default Navigation;