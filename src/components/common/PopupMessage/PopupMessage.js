import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ReactComponent as CancelIcon} from '../../../content/images/cancel_icon.svg';
import {getPopupMessage} from '../../../store/selectors';
import {setPopupMessage} from '../../../store/actionCreators';
import './PopupMessage.scss';

function PopupMessage() {
    const message = useSelector(getPopupMessage);
    const dispatch = useDispatch();
    const timer = useRef(null);

    const hidePopupMessage = () => dispatch(setPopupMessage(null));

    // Если сообщение изменяется пока компонент виден - снова запускаем таймер отображения сообщения
    useEffect(() => {
        if (message) timer.current = setTimeout(hidePopupMessage, 3000);
    }, [message]);

    // Предотвращаем возможную попытку обновления состояния компонента при его размонтировании
    useEffect(() => () => clearTimeout(timer.current), []);

    const handleCancelIconClick = () => hidePopupMessage();

    return (
        <div className="popup_message">
            <h1 className="popup_message__text">{message}</h1>
            <CancelIcon onClick={handleCancelIconClick}/>
        </div>
    );
}

export default PopupMessage;