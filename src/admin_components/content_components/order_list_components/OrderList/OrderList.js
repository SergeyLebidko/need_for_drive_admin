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
        if (location.pathname !== `/${ADMIN_APP_URL}/${ORDER_LIST_APP_URL}`) return;

        const page = new URLSearchParams(location.search).get('page');
        dispatch(loadOrderList(page))
            .then(() => setDone(true))
            .catch(err => {
                setDone(true);
                setError(err);
            });
    }, [location]);

    return (
        <div className="order_list">
            {done ?
                (error ?
                        <ErrorPane error={error}/>
                        :
                        <>
                            <h1 className="order_list__caption">Заказы</h1>
                            <div className="order_list__content">
                                <OrderFilters/>
                                <ul>
                                    {items.map(item => <OrderCard key={item.id} order={item}/>)}
                                </ul>
                                <Paginator/>
                            </div>
                        </>
                )
                :
                <Preloader/>
            }
        </div>
    );
}

export default OrderList;