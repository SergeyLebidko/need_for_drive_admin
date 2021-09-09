import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getPopupMessage} from '../../../store/selectors';
import {ReactComponent as CancelIcon} from '../../../content/images/cancel_icon.svg';
import './PopupMessage.scss';
import {setPopupMessage} from "../../../store/actionCreators";

function PopupMessage() {
    const message = useSelector(getPopupMessage);
    const dispatch = useDispatch();
    const timer = useRef(null);

    const hidePopupMessage = () => dispatch(setPopupMessage(null));

    useEffect(() => {
        timer.current = setTimeout(hidePopupMessage, 3000);
    }, []);

    const handleCancelIconClick = () => {
        clearTimeout(timer.current);
        hidePopupMessage();
    };

    return (
        <div className="popup_message">
            <h1 className="popup_message__text">{message}</h1>
            <CancelIcon onClick={handleCancelIconClick}/>
        </div>
    );
}

export default PopupMessage;