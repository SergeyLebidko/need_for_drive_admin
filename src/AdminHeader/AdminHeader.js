import React from 'react';
import SearchField from '../SearchField/SearchField';
import Notification from '../Notification/Notification';
import UserPane from '../UserPane/UserPane';
import './AdminHeader.scss';

function AdminHeader() {
    return (
        <header className="admin_header">
            <SearchField/>
            <Notification/>
            <UserPane/>
        </header>
    );
}

export default AdminHeader;
