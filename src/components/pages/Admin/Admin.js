import React, {useState, useEffect} from 'react';
import Menu from '../../admin/menu/Menu/Menu';
import AdminHeader from '../../admin/header/AdminHeader/AdminHeader';
import AdminContent from '../../admin/content/AdminContent/AdminContent';
import AdminFooter from '../../admin/footer/AdminFooter/AdminFooter';
import Preloader from '../../common/Preloader/Preloader';
import ErrorPane from '../../common/ErrorPane/ErrorPane';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {LOGIN_APP_URL} from '../../../constants/urls';
import {MENU_ITEMS} from '../../../constants/settings';
import {check, refresh} from '../../../utils/fetch_utils';
import {setMenuItems, setUsername} from '../../../store/actionCreators';
import './Admin.scss';

function Admin() {
    const [hasAuthProcess, setHasAuthProcess] = useState(true);
    const [authProcessError, setAuthProcessError] = useState(null);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        (async function () {
            let username;
            let checkCount = 0;
            try {
                // Запрашиваем имя пользователя. Если нужно - обновляем access-токен
                do {
                    if (checkCount === 1) await refresh();
                    username = await check();
                    checkCount++;
                } while (!username && checkCount < 2);

                // Если не произошло непредвиденных сетевых ошибок, действуем в зависимости от того, получено ли имя пользователя
                if (username) {
                    dispatch(setUsername(username));
                    dispatch(setMenuItems(MENU_ITEMS));
                } else {
                    goLogin();
                    return;
                }

            } catch (err) {
                // Если произошла не ожидаемая ошибка - выводим компонент с сообщением о ней
                setAuthProcessError(err);
            }

            setHasAuthProcess(false);
        })();
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