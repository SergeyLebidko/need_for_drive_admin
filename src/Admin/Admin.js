import React from 'react';
import Menu from '../Menu/Menu';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminContent from '../AdminContent/AdminContent';
import './Admin.scss';

function Admin(){
    return (
        <>
            <Menu/>
            <section className="admin__work_section">
                <AdminHeader/>
                <AdminContent/>
            </section>
        </>
    )
}

export default Admin;