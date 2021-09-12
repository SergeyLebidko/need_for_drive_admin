import React, {useEffect, useRef} from 'react';
import classNames from 'classnames';
import {useSelector, useDispatch} from 'react-redux';
import {ReactComponent as CancelIcon} from '../../../content/images/cancel_icon.svg';
import {getPopupMessage} from '../../../store/selectors';
import {setPopupMessage} from '../../../store/actionCreators';
import {FAIL, SUCCESS} from '../../../constants/settings';
import './PopupMessage.scss';

function PopupMessage() {
    const {status, text} = useSelector(getPopupMessage);
    const dispatch = useDispatch();
    const timer = useRef(null);

    // Если сообщение изменяется пока компонент виден - снова запускаем таймер отображения сообщения
    useEffect(() => {
        clearTimeout(timer.current);
        if (text) timer.current = setTimeout(hidePopupMessage, 3000);
    }, [text]);

    // Предотвращаем возможную попытку обновления состояния компонента по таймеру после его размонтирования
    useEffect(() => () => clearTimeout(timer.current), []);

    const hidePopupMessage = () => dispatch(setPopupMessage(status, null));

    const handleCancelIconClick = () => hidePopupMessage();

    // Сообщение, состоящее только из строки текста считаем сообщением об успехе некой операции
    const popupMessageClasses = classNames(
        'popup_message',
        {
            'popup_message_visible': !!text,
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