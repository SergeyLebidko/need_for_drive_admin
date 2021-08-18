import React, {useEffect} from 'react';
import Menu from '../Menu/Menu';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminContent from '../AdminContent/AdminContent';
import {useDispatch} from 'react-redux';
import {MENU_ITEMS} from '../settings';
import {setMenuItems} from '../store/actionCreators';
import './Admin.scss';

function Admin() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setMenuItems(MENU_ITEMS));
    }, [dispatch]);

    return (
        <>
            <Menu/>
            <AdminHeader/>
            <AdminContent/>
        </>
    )
}

export default Admin;