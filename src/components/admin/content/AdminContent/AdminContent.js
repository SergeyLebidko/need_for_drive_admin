import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import OrderList from '../order_list/OrderList/OrderList';
import CarList from '../car_list/CarList/CarList';
import PointList from '../point_list/PointList/PointList';
import NoMatch from '../../../common/NoMatch/NoMatch';
import {CAR_LIST_APP_URL, ORDER_LIST_APP_URL, POINT_LIST_APP_URL} from '../../../../constants/urls';
import './AdminContent.scss';

function AdminContent() {
    const match = useRouteMatch();

    // Учитываем, что если не выбран ни один пункт меню, то внутри области контента не должен отображаться ни один компонент
    return (
        <main className="admin_content">
            <Switch>
                <Route exact path={match.path} component={null}/>
                <Route path={`${match.path}/${ORDER_LIST_APP_URL}`} component={OrderList}/>
                <Route path={`${match.path}/${CAR_LIST_APP_URL}`} component={CarList}/>
                <Route path={`${match.path}/${POINT_LIST_APP_URL}`} component={PointList}/>
                <Route path="*" component={NoMatch}/>
            </Switch>
        </main>
    )
}

export default AdminContent;