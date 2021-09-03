import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import ErrorPane from '../../../../common/ErrorPane/ErrorPane';
import OrderFilters from '../OrderFilters/OrderFilters';
import Paginator from '../../../../common/Paginator/Paginator';
import OrderCard from '../OrderCard/OrderCard';
import {loadOrderList} from '../../../../../store/actionCreators';
import {getFrame} from '../../../../../store/selectors';
import {useGlobalPreloader} from '../../../../../store/hooks';
import {ADMIN_APP_URL, ORDER_LIST_APP_URL} from '../../../../../constants/urls';
import {
    PAGE_FILTER_NAME,
    DATE_FROM_FILTER_NAME,
    CAR_FILTER_NAME,
    CITY_FILTER_NAME,
    STATUS_FILTER_NAME,
} from '../../../../../constants/settings';
import './OrderList.scss';

function OrderList() {
    const [done, setDone] = useState(false);
    const [error, setError] = useState(null);

    const location = useLocation();
    const dispatch = useDispatch();

    const [showGlobalPreloader, hideGlobalPreloader] = useGlobalPreloader();

    const frame = useSelector(getFrame);
    let items;
    if (frame) items = frame.data;

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

        showGlobalPreloader();
        setError(null);
        setDone(false);
        dispatch(loadOrderList(page, date, car, city, status))
            .catch(err => setError(err))
            .finally(() => {
                hideGlobalPreloader();
                setDone(true);
            });
    }, [location]);

    if (error) return <ErrorPane error={error}/>;

    return (
        <div className="order_list">
            <h1 className="order_list__caption">Заказы</h1>
            {done &&
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
            }
        </div>
    );
}

export default OrderList;