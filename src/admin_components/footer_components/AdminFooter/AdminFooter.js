import React from 'react';
import {Link} from 'react-router-dom';
import './AdminFooter.scss';

function AdminFooter(){
    return (
        <footer className="admin_footer">
            <Link to="/admin">Главная страница</Link>
            <a href="https://hproger.ru/need_for_drive/">Сервис NFD</a>
            <span>Copyright	&#169; 2021 Simbirsoft</span>
        </footer>
    );
}

export default AdminFooter;