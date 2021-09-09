import React from 'react';
import {useSelector} from 'react-redux';
import {getPopupMessage} from '../../../../store/selectors';
import {Switch, Route} from 'react-router-dom';
import OrderList from '../order_list/OrderList/OrderList';
import CarList from '../car_list/CarList/CarList';
import PointList from '../point_list/PointList/PointList';
import Order from '../order/Order/Order';
import Car from '../car/Car/Car';
import Point from '../point/Point/Point';
import NoMatch from '../../../common/NoMatch/NoMatch';
import PopupMessage from '../../../common/PopupMessage/PopupMessage';
import {
    ADMIN_APP_URL,
    CAR_APP_URL,
    CAR_LIST_APP_URL,
    ORDER_APP_URL,
    ORDER_LIST_APP_URL,
    POINT_APP_URL,
    POINT_LIST_APP_URL
} from '../../../../constants/urls';
import './AdminContent.scss';

function AdminContent() {
    const hasPopupMessage = !!useSelector(getPopupMessage);

    // Учитываем, что если не выбран ни один пункт меню, то внутри области контента не должен отображаться ни один компонент
    return (
        <main className="admin_content">
            {hasPopupMessage && <PopupMessage/>}
            <Switch>
                <Route exact path={`/${ADMIN_APP_URL}`} component={null}/>
                <Route path={`/${ADMIN_APP_URL}/${ORDER_LIST_APP_URL}`} component={OrderList}/>
                <Route path={`/${ADMIN_APP_URL}/${CAR_LIST_APP_URL}`} component={CarList}/>
                <Route path={`/${ADMIN_APP_URL}/${POINT_LIST_APP_URL}`} component={PointList}/>
                <Route path={`/${ADMIN_APP_URL}/${ORDER_APP_URL}/:orderId`} component={Order}/>
                <Route path={`/${ADMIN_APP_URL}/${ORDER_APP_URL}`} component={Order}/>
                <Route path={`/${ADMIN_APP_URL}/${CAR_APP_URL}/:carId`} component={Car}/>
                <Route path={`/${ADMIN_APP_URL}/${CAR_APP_URL}`} component={Car}/>
                <Route path={`/${ADMIN_APP_URL}/${POINT_APP_URL}/:pointId`} component={Point}/>
                <Route path={`/${ADMIN_APP_URL}/${POINT_APP_URL}`} component={Point}/>
                <Route path="*" component={NoMatch}/>
            </Switch>
        </main>
    )
}

export default AdminContent;