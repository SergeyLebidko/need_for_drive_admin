import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import Preloader from '../../../common_components/Preloader/Preloader';
import ErrorPane from '../../../common_components/ErrorPane/ErrorPane';
import {loadOrderList} from '../../../store/actionCreators';
import {getFrame} from '../../../store/selectors';
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
        const page = new URLSearchParams(location.search).get('page');
        dispatch(loadOrderList(page))
            .then(() => setDone(true))
            .catch(err => {
                setDone(true);
                setError(err);
            });
    }, []);

    return (
        <div className="order_list">
            {done ?
                (error ?
                        <ErrorPane error={error}/>
                        :
                        <>
                            <h1 className="order_list__caption">Заказы</h1>
                            <div>
                                <div>
                                    Здесь будут фильтры
                                </div>
                                <ul>
                                    {items.map(item => <li key={item.id}>{item.id}</li>)}
                                </ul>
                                <div>
                                    Здесь будет пагинация
                                </div>
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