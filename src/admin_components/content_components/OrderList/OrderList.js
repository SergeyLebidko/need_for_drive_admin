import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Preloader from '../../../common_components/Preloader/Preloader';
import {loadOrderList} from '../../../store/actionCreators';
import './OrderList.scss';
import ErrorPane from "../../../common_components/ErrorPane/ErrorPane";

function OrderList() {
    let [done, setDone] = useState(false);
    let [error, setError] = useState(null);

    const location = useLocation();
    const dispatch = useDispatch();

    // При монтировании компонента - получаем с сервера список заказов
    useEffect(() => {
        const page = new URLSearchParams(location.search).get('page');
        dispatch(loadOrderList(page))
            .then(() => setDone(true))
            .catch(err => {
                setDone(true);
                setError(err);
            });
    }, []);

    return (
        <div>
            {done ?
                (error ?
                        <ErrorPane error={error}/>
                        :
                        'Здесь будет список заказов'
                )
                :
                <Preloader/>
            }
        </div>
    );
}

export default OrderList;