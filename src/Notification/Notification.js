import React, {useState, useEffect} from 'react';
import {ReactComponent as NotificationIcon} from '../content/images/notification.svg';
import './Notification.scss';

function Notification() {
    let [count, setCount] = useState(0);
    const generateCount = () => Math.floor(Math.random() * 50) + 1;

    useEffect(() => setCount(generateCount()), []);
    const handleClick = () => setCount(generateCount());

    return (
        <div className="notification">
            <NotificationIcon onClick={handleClick}/>
            {count && <div className="notification__count" onClick={handleClick}>{count}</div>}
        </div>
    )
}

export default Notification;