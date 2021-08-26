import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import Preloader from '../../../../common_components/Preloader/Preloader';
import ErrorPane from '../../../../common_components/ErrorPane/ErrorPane';
import OrderFilters from '../OrderFilters/OrderFilters';
import Paginator from '../../../../common_components/Paginator/Paginator';
import OrderCard from '../OrderCard/OrderCard';
import {loadOrderList} from '../../../../store/actionCreators';
import {getFrame} from '../../../../store/selectors';
import {ADMIN_APP_URL, ORDER_LIST_APP_URL} from '../../../../urls';
import {
    PAGE_FILTER_NAME,
    DATE_FROM_FILTER_NAME,
    CAR_FILTER_NAME,
    CITY_FILTER_NAME,
    STATUS_FILTER_NAME
} from '../../../../settings';
import './OrderList.scss';

function OrderList() {
    let [done, setDone] = useState(false);
    let [error, setError] = useState(null);

    const frame = useSelector(getFrame);
    let items;
    if (frame) items = frame.data;

    const location = useLocation();
    const dispatch = useDispatch();

    // При монтировании компонента - получаем с сервера список заказов
    useEffect(() => {
        // Предотвращаем выполнение ненужных действий, если компонент размонтирован
        if (!location.pathname.startsWith(`/${ADMIN_APP_URL}/${ORDER_LIST_APP_URL}`)) return;

        const params = new URLSearchParams(location.search);
        const page = params.get(PAGE_FILTER_NAME);
        const date = params.get(DATE_FROM_FILTER_NAME);
        const car = params.get(CAR_FILTER_NAME);
        const city = params.get(CITY_FILTER_NAME);
        const status = params.get(STATUS_FILTER_NAME);

        setDone(false);
        setError(null);
        dispatch(loadOrderList(page, date, car, city, status))
            .then(() => setDone(true))
            .catch(err => {
                setError(err);
                setDone(true);
            });
    }, [location]);

    if (!done) return <Preloader/>;

    if (error) return <ErrorPane error={error}/>;

    return (
        <div className="order_list">
            <h1 className="order_list__caption">Заказы</h1>
            <div className="order_list__content">
                <OrderFilters/>
                {items && items.length > 0 &&
                <>
                    <ul>
                        {items.map(item => <OrderCard key={item.id} order={item}/>)}
                    </ul>
                    <Paginator/>
                </>
                }
            </div>
        </div>
    );
}

export default OrderList;