import React from 'react';
import ErrorPane from '../../../../common/ErrorPane/ErrorPane';
import OrderFilters from '../OrderFilters/OrderFilters';
import Paginator from '../../../../common/Paginator/Paginator';
import OrderCard from '../OrderCard/OrderCard';
import {loadOrderList} from '../../../../../store/actionCreators';
import {useListLoader} from '../../../../../store/hooks';
import {ORDER_LIST_APP_URL} from '../../../../../constants/urls';
import {
    DATE_FROM_FILTER_NAME,
    CAR_FILTER_NAME,
    CITY_FILTER_NAME,
    STATUS_FILTER_NAME,
} from '../../../../../constants/settings';
import './OrderList.scss';

function OrderList() {
    const [done, error, items] = useListLoader(
        ORDER_LIST_APP_URL,
        [DATE_FROM_FILTER_NAME, CAR_FILTER_NAME, CITY_FILTER_NAME, STATUS_FILTER_NAME],
        loadOrderList
    );

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