import React from 'react';
import Menu from '../Menu/Menu';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminContent from '../AdminContent/AdminContent';
import './Admin.scss';

function Admin() {
    return (
        <>
            <Menu/>
            <AdminHeader/>
            <AdminContent/>
        </>
    )
}

export default Admin;