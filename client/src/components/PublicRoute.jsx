

import FooterComp from '@/layout/Footer';
import NavbarComp from '@/layout/Navbar';
import React from 'react' 
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => { 
    const { token } = useSelector(state => state.auth); 

    if (token) {
        return (
            <>
                <NavbarComp />
                {children}
                <FooterComp/>
            </>
        )
    } else {
        return <Navigate to={'/login'} />
    }
}

export default PublicRoute;
