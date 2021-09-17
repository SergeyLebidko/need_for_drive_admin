import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Switch, Route, useHistory} from 'react-router-dom';
import OrderList from '../order_list/OrderList/OrderList';
import CarList from '../car_list/CarList/CarList';
import PointList from '../point_list/PointList/PointList';
import Order from '../order/Order/Order';
import Car from '../car/Car/Car';
import Point from '../point/Point/Point';
import NoMatch from '../../../common/NoMatch/NoMatch';
import RouterCap from '../../../common/RouterCap/RouterCap';
import PopupMessage from '../../../common/PopupMessage/PopupMessage';
import {setPopupMessage} from '../../../../store/actionCreators';
import {
    ADMIN_APP_URL,
    ORDER_LIST_APP_URL,
    CAR_LIST_APP_URL,
    POINT_LIST_APP_URL,
    ORDER_EDIT_APP_URL,
    CAR_CREATE_APP_URL,
    CAR_EDIT_APP_URL,
    POINT_CREATE_APP_URL,
    POINT_EDIT_APP_URL,
} from '../../../../constants/urls';
import './AdminContent.scss';

function AdminContent() {
    const history = useHistory();
    const dispatch = useDispatch();

    // При размонтировании компонента - удаляем из хранилища данные всплывающих сообщений
    useEffect(() => () => {
        dispatch(setPopupMessage(null, null));
    }, []);

    const toOrderList = () => history.push(`/${ADMIN_APP_URL}/${ORDER_LIST_APP_URL}`);
    const toCarList = () => history.push(`/${ADMIN_APP_URL}/${CAR_LIST_APP_URL}`);
    const toPointList = () => history.push(`/${ADMIN_APP_URL}/${POINT_LIST_APP_URL}`);

    // Учитываем, что если не выбран ни один пункт меню, то внутри области контента не должен отображаться ни один компонент
    return (
        <main className="admin_content">
            <PopupMessage/>
            <Switch>
                <Route exact path={`/${ADMIN_APP_URL}`} component={null}/>

                <Route path={`/${ADMIN_APP_URL}/${ORDER_LIST_APP_URL}`} component={OrderList}/>
                <Route path={`/${ADMIN_APP_URL}/${CAR_LIST_APP_URL}`} component={CarList}/>
                <Route path={`/${ADMIN_APP_URL}/${POINT_LIST_APP_URL}`} component={PointList}/>

                <Route path={`/${ADMIN_APP_URL}/${ORDER_EDIT_APP_URL}/:id`} component={Order}/>
                <Route path={`/${ADMIN_APP_URL}/${ORDER_EDIT_APP_URL}`}>
                    <RouterCap
                        mainCaption="Для редактирования заказа сперва выберите нужный заказ из списка"
                        buttonCaption="Перейти к списку заказов"
                        handleButtonClick={toOrderList}
                    />
                </Route>

                <Route path={`/${ADMIN_APP_URL}/${CAR_CREATE_APP_URL}`} component={Car}/>
                <Route path={`/${ADMIN_APP_URL}/${CAR_EDIT_APP_URL}/:carId`} component={Car}/>
                <Route path={`/${ADMIN_APP_URL}/${CAR_EDIT_APP_URL}`}>
                    <RouterCap
                        mainCaption="Для редактирования автомобиля сперва выберите нужный автомобиль из списка"
                        buttonCaption="Перейти к списку автомобилей"
                        handleButtonClick={toCarList}
                    />
                </Route>

                <Route path={`/${ADMIN_APP_URL}/${POINT_CREATE_APP_URL}`} component={Point}/>
                <Route path={`/${ADMIN_APP_URL}/${POINT_EDIT_APP_URL}/:pointId`} component={Point}/>
                <Route path={`/${ADMIN_APP_URL}/${POINT_EDIT_APP_URL}/`}>
                    <RouterCap
                        mainCaption="Для редактирования пункта выдачи сперва выберите нужный пункт выдачи из списка"
                        buttonCaption="Перейти к списку пунктов выдачи"
                        handleButtonClick={toPointList}
                    />
                </Route>

                <Route path="*" component={NoMatch}/>
            </Switch>
        </main>
    )
}

export default AdminContent;