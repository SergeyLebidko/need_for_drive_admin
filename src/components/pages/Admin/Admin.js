import React, {useEffect} from 'react';
import Menu from '../../admin/menu/Menu/Menu';
import AdminHeader from '../../admin/header/AdminHeader/AdminHeader';
import AdminContent from '../../admin/content/AdminContent/AdminContent';
import AdminFooter from '../../admin/footer/AdminFooter/AdminFooter';
import Preloader from '../../common/Preloader/Preloader';
import ErrorPane from '../../common/ErrorPane/ErrorPane';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {LOGIN_APP_URL} from '../../../constants/urls';
import {MENU_ITEMS} from '../../../constants/settings';
import {fetchUsername} from '../../../utils/fetch_utils';
import {setMenuItems, setUsername, setError, setPreloader} from '../../../store/actionCreators';
import {getUsername, getError, getPreloader} from '../../../store/selectors';
import './Admin.scss';

function Admin() {
    const history = useHistory();
    const dispatch = useDispatch();

    const username = useSelector(getUsername);
    const error = useSelector(getError);
    const preloader = useSelector(getPreloader);

    useEffect(() => {
        setError(null);
        setPreloader(true);
        (async function () {
            try {
                const username = await fetchUsername();
                if (username) {
                    dispatch(setUsername(username));
                    dispatch(setMenuItems(MENU_ITEMS));
                } else {
                    goLogin();
                    return;
                }
            } catch (err) {
                setError({description: err, handler: goLogin});
            }
            setPreloader(false);
        })();
    }, [dispatch]);

    const goLogin = () => {
        dispatch(setError(null));
        history.push(`/${LOGIN_APP_URL}`);
    };

    return (
        <>
            {preloader && <Preloader fullscreen/>}
            {error && <ErrorPane error={error.description} handleBackButtonClick={error.handler} fullscreen/>}
            {username &&
            <>
                <Menu/>
                <section className="work_section">
                    <AdminHeader/>
                    <AdminContent/>
                    <AdminFooter/>
                </section>
            </>
            }
        </>
    )
}

export default Admin;