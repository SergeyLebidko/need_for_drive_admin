import React, {useEffect, useRef} from 'react';
import classNames from 'classnames';
import {useSelector, useDispatch} from 'react-redux';
import {ReactComponent as CancelIcon} from '../../../content/images/cancel_icon.svg';
import {getPopupMessage} from '../../../store/selectors';
import {setPopupMessage} from '../../../store/actionCreators';
import './PopupMessage.scss';

function PopupMessage() {
    const message = useSelector(getPopupMessage);
    const dispatch = useDispatch();
    const timer = useRef(null);

    // Если сообщение изменяется пока компонент виден - снова запускаем таймер отображения сообщения
    useEffect(() => {
        clearTimeout(timer.current);
        if (message) timer.current = setTimeout(hidePopupMessage, 3000);
    }, [message]);

    // Предотвращаем возможную попытку обновления состояния компонента по таймеру после его размонтирования
    useEffect(() => () => clearTimeout(timer.current), []);

    const hidePopupMessage = () => dispatch(setPopupMessage(null));

    const handleCancelIconClick = () => hidePopupMessage();

    const popupMessageClasses = classNames('popup_message', {'popup_message_visible': !!message});

    return (
        <div className={popupMessageClasses}>
            < h1 className="popup_message__text">{message}</h1>
            <CancelIcon onClick={handleCancelIconClick}/>
        </div>
    );
}

export default PopupMessage;