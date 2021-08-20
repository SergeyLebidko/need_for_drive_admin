import React, {useState, useRef} from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {ReactComponent as DownArrow} from '../content/images/down.svg';
import userPicture from '../content/images/user.jpeg';
import './UserPane.scss';

function UserPane() {
    let [hasPopup, setHasPopup] = useState(false);
    let popupTimer = useRef(null);

    const handleElementClick = () => setHasPopup(oldVal => !oldVal);

    const handlePaneLeave = () => {
        if (!hasPopup) return;
        popupTimer.current = setTimeout(() => setHasPopup(false), 200);
    }

    const handlePaneOver = () => clearTimeout(popupTimer.current);

    const popupClasses = classNames('user_pane__popup', {'visible_popup': hasPopup});

    return (
        <div className="user_pane" onMouseOver={handlePaneOver} onMouseLeave={handlePaneLeave}>
            <img src={userPicture} className="user_pane__photo" alt="Пользователь" onClick={handleElementClick}/>
            <span className="user_pane__name" onClick={handleElementClick}>Admin</span>
            <DownArrow onClick={handleElementClick}/>
            <div className={popupClasses}>
                <Link to="/">Выход</Link>
            </div>
        </div>
    );
}

export default UserPane;