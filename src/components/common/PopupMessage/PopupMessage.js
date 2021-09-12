import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import {useSelector} from 'react-redux';
import {ReactComponent as CancelIcon} from '../../../content/images/cancel_icon.svg';
import {getPopupMessage} from '../../../store/selectors';
import {FAIL, SUCCESS} from '../../../constants/settings';
import './PopupMessage.scss';

function PopupMessage() {
    const [hasVisible, setHasVisible] = useState(false);
    const message = useSelector(getPopupMessage);
    const timer = useRef(null);

    const {text, status} = message;

    const hidePopupMessage = () => setHasVisible(false);

    useEffect(() => {
        clearTimeout(timer.current);
        if (text) {
            timer.current = setTimeout(hidePopupMessage, 3000);
            setHasVisible(true);
            return;
        }
        setHasVisible(false);
    }, [message]);

    // Предотвращаем возможную попытку обновления состояния компонента по таймеру после его размонтирования
    useEffect(() => () => clearTimeout(timer.current), []);

    const handleCancelIconClick = () => hidePopupMessage();

    const popupMessageClasses = classNames(
        'popup_message',
        {
            'popup_message_visible': hasVisible,
            'fail_message': status === FAIL,
            'success_message': status === SUCCESS
        }
    );

    return (
        <div className={popupMessageClasses}>
            <h1 className="popup_message__text">{text}</h1>
            <CancelIcon onClick={handleCancelIconClick}/>
        </div>
    );
}

export default PopupMessage;