import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import OrderList from '../OrderList/OrderList';
import NoMatch from '../../../common_components/NoMatch/NoMatch';
import './AdminContent.scss';

function AdminContent() {
    const match = useRouteMatch();

    // Учитываем, что если не выбран ни один пункт меню, то внутри области контента не должен отображаться ни один компонент
    return (
        <main className="admin_content">
            <Switch>
                <Route exact path={match.path} component={null}/>
                <Route path={`${match.path}/orders`} component={OrderList}/>
                <Route path="*" component={NoMatch}/>
            </Switch>
        </main>
    )
}

export default AdminContent;