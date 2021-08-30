import React, {useState, useRef} from 'react';
import classNames from 'classnames';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {ReactComponent as DownArrow} from '../../../../content/images/down.svg';
import userPicture from '../../../../content/images/user.jpeg';
import {getUsername} from '../../../../store/selectors';
import {logout} from '../../../../utils/fetch_utils';
import {LOGIN_APP_URL} from '../../../../constants/urls';
import {setPreloader, setError} from '../../../../store/actionCreators';
import './UserPane.scss';

function UserPane() {
    const [hasPopup, setHasPopup] = useState(false);
    const username = useSelector(getUsername);
    const history = useHistory();
    const popupTimer = useRef(null);

    const dispatch = useDispatch();
    const showPreloader = () => dispatch(setPreloader(true));
    const hidePreloader = () => dispatch(setPreloader(false));
    const showError = (description, handler) => dispatch(setError({description, handler}));
    const hideError = () => dispatch(setError(false));

    const handleElementClick = () => setHasPopup(oldVal => !oldVal);

    const handlePaneLeave = () => {
        if (!hasPopup) return;
        popupTimer.current = setTimeout(() => setHasPopup(false), 200);
    }

    const handlePaneOver = () => clearTimeout(popupTimer.current);

    const handleLogoutClick = () => {
        showPreloader();
        logout()
            .then(() => history.push(`/${LOGIN_APP_URL}`))
            .catch(err => showError(err, hideError))
            .finally(hidePreloader);
    }

    const popupClasses = classNames('user_pane__popup', {'visible_popup': hasPopup});

    return (
        <div className="user_pane" onMouseOver={handlePaneOver} onMouseLeave={handlePaneLeave}>
            <img src={userPicture} className="user_pane__photo" alt="Пользователь" onClick={handleElementClick}/>
            <span className="user_pane__name" onClick={handleElementClick}>{username}</span>
            <DownArrow onClick={handleElementClick}/>
            <div className={popupClasses}>
                <span onClick={handleLogoutClick}>Выход</span>
            </div>
        </div>
    );
}

export default UserPane;