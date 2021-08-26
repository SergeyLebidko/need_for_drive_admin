import React, {useEffect} from 'react';
import Menu from '../admin_components/menu_components/Menu/Menu';
import AdminHeader from '../admin_components/header_components/AdminHeader/AdminHeader';
import AdminContent from '../admin_components/content_components/AdminContent/AdminContent';
import AdminFooter from '../admin_components/footer_components/AdminFooter/AdminFooter';
import {useDispatch} from 'react-redux';
import {MENU_ITEMS} from '../settings';
import {setMenuItems} from '../store/actionCreators';
import './Admin.scss';

function Admin() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setMenuItems(MENU_ITEMS));
    }, [dispatch]);

    // TODO Добавить проверку наличия учетных данных при монтировании компонента

    return (
        <>
            <Menu/>
            <section className="work_section">
                <AdminHeader/>
                <AdminContent/>
                <AdminFooter/>
            </section>
        </>
    )
}

export default Admin;