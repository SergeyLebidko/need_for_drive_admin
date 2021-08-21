import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Preloader from '../../../common_components/Preloader/Preloader';
import {loadOrderList} from '../../../store/actionCreators';
import './OrderList.scss';

function OrderList() {
    let [done, setDone] = useState(false);

    const location = useLocation();
    const dispatch = useDispatch();

    // При монтировании компонента - получаем с сервера список заказов
    useEffect(() => {
        const page = new URLSearchParams(location.search).get('page');
        dispatch(loadOrderList(page)).then(() => setDone(true));
    }, []);

    return (
        <div>
            {done ?
                'Здесь будет список заказов'
                :
                <Preloader/>
            }
        </div>
    );
}

export default OrderList;