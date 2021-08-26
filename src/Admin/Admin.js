import React, {useState, useEffect} from 'react';
import Menu from '../admin_components/menu_components/Menu/Menu';
import AdminHeader from '../admin_components/header_components/AdminHeader/AdminHeader';
import AdminContent from '../admin_components/content_components/AdminContent/AdminContent';
import AdminFooter from '../admin_components/footer_components/AdminFooter/AdminFooter';
import Preloader from '../common_components/Preloader/Preloader';
import ErrorPane from '../common_components/ErrorPane/ErrorPane';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {LOGIN_APP_URL} from '../urls';
import {MENU_ITEMS} from '../settings';
import {checkAuthorization} from '../utils/fetch_utils';
import {setMenuItems, setUsername} from '../store/actionCreators';
import './Admin.scss';

function Admin() {
    const [hasAuthProcess, setHasAuthProcess] = useState(true);
    const [authProcessError, setAuthProcessError] = useState(null);

    const history = useHistory();
    const dispatch = useDispatch();

    // Проверяем наличие учетных данных и если они есть - готовим данные меню
    useEffect(() => {
        checkAuthorization()
            .then(username => {
                if (!username) {
                    goLogin();
                    return;
                }
                dispatch(setMenuItems(MENU_ITEMS));
                dispatch(setUsername(username));
                setHasAuthProcess(false);
            })
            .catch(err => {
                setAuthProcessError(err);
                setHasAuthProcess(false);
            });
    }, [dispatch]);

    const goLogin = () => history.push(`/${LOGIN_APP_URL}`);

    if (hasAuthProcess) return <Preloader/>;

    if (authProcessError) return (
        <ErrorPane error={authProcessError} handleBackButtonClick={goLogin}/>
    );

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