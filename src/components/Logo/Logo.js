import React from 'react';
import Tilt from 'react-tilt';
import face from './face.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt" options={{ max : 55 }} style={{ height: 100, width: 150 }} >
                <div className="Tilt-inner">
                    <img src={face} alt='logo' />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;