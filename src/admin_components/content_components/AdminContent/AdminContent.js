import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import OrderList from '../order_list_components/OrderList/OrderList';
import NoMatch from '../../../common_components/NoMatch/NoMatch';
import ErrorPane from '../../../common_components/ErrorPane/ErrorPane';
import './AdminContent.scss';

// TODO В дальнейшем удалить. Сейчас нужен только для демонстрации верстки страницы с ошибкой
const ErrorSample = () => <ErrorPane error={{httpStatus: 500, httpText: 'Failed to fetch'}}/>;

function AdminContent() {
    const match = useRouteMatch();

    // Учитываем, что если не выбран ни один пункт меню, то внутри области контента не должен отображаться ни один компонент
    return (
        <main className="admin_content">
            <Switch>
                <Route exact path={match.path} component={null}/>
                <Route path={`${match.path}/orders`} component={OrderList}/>
                <Route path={`${match.path}/error`} component={ErrorSample}/>
                <Route path="*" component={NoMatch}/>
            </Switch>
        </main>
    )
}

export default AdminContent;