import React from 'react';
import {useRouteMatch, useHistory} from 'react-router-dom';
import './Order.scss';
import {ADMIN_APP_URL, ORDER_LIST_APP_URL} from "../../../../../constants/urls";

function Order() {
    const {params: {orderId}} = useRouteMatch();
    const history = useHistory();

    const toOrderList = () => history.push(`/${ADMIN_APP_URL}/${ORDER_LIST_APP_URL}`);

    return (
        <div className="order">
            {orderId ?
                <>
                    <h1 className="order__caption">Заказ №{orderId}</h1>
                    <div className="order__content">
                        Форма редактирования/удаления заказа
                    </div>
                </>
                :
                <>
                    <div className="order__content order__no_order_id">
                        <h1>Выберите заказ для редактирования на странице списка заказов</h1>
                        <button className="button button_green" onClick={toOrderList}>
                            Перейти к списку заказов
                        </button>
                    </div>
                </>
            }

        </div>
    );
}

export default Order;