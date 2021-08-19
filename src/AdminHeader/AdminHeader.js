import React from 'react';
import SearchField from '../SearchField/SearchField';
import Notification from '../Notification/Notification';
import './AdminHeader.scss';

function AdminHeader() {
    return (
        <header className="admin_header">
            <SearchField/>
            <Notification/>
        </header>
    );
}

export default AdminHeader;
