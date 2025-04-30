import React from 'react';
import Logo from '../Logo/Logo';

const Header: React.FC = () => {
    return (
        <header className="p-4 flex items-center justify-center text-center">          
            <Logo width={300} height={60} className="drop-shadow-md text-center" />
        </header>
    );
}

export default Header;