import React from 'react';
import SearchField from '../SearchField/SearchField';
import './AdminHeader.scss';

function AdminHeader(){
    return (
        <header className="admin_header">
            <SearchField/>
        </header>
    );
}

export default AdminHeader;
