import React, {useEffect, useState} from 'react';
import ErrorPane from '../../../../common/ErrorPane/ErrorPane';
import Paginator from '../../../../common/Paginator/Paginator';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {useGlobalPreloader} from '../../../../../store/hooks';
import {loadPointList} from '../../../../../store/actionCreators';
import {getFrame} from '../../../../../store/selectors';
import {PAGE_FILTER_NAME} from '../../../../../constants/settings';
import {ADMIN_APP_URL, POINT_LIST_APP_URL} from '../../../../../constants/urls';
import './PointList.scss';

function PointList() {
    const [done, setDone] = useState(false);
    const [error, setError] = useState(null);

    const frame = useSelector(getFrame);
    let items;
    if (frame) items = frame.data;

    const dispatch = useDispatch();
    const location = useLocation();

    const [showGlobalPreloader, hideGlobalPreloader] = useGlobalPreloader();

    useEffect(() => {
        // Предотвращаем выполнение ненужных действий, если компонент размонтирован
        if (!location.pathname.startsWith(`/${ADMIN_APP_URL}/${POINT_LIST_APP_URL}`)) return;

        const params = new URLSearchParams(location.search);
        const page = params.get(PAGE_FILTER_NAME);

        showGlobalPreloader();
        setError(null);
        setDone(false);
        dispatch(loadPointList(page))
            .catch(err => setError(err))
            .finally(() => {
                hideGlobalPreloader();
                setDone(true);
            });
    }, [location]);

    if (error) return <ErrorPane error={error}/>;

    return (
        <div className="point_list">
            <h1 className="point_list__caption">Пункты выдачи</h1>
            {done &&
                <>
                <div className="point_list__content">
                    {items && items.length > 0 &&
                    <>
                        <ul>
                            {items.map(item => <li key={item.id}>{item.name}</li>)}
                        </ul>
                        <Paginator/>
                    </>
                    }
                </div>
            </>
            }
        </div>
    )
}

export default PointList;