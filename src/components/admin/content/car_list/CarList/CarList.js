import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import ErrorPane from '../../../../common/ErrorPane/ErrorPane';
import {ADMIN_APP_URL, CAR_LIST_APP_URL} from '../../../../../constants/urls';
import {PAGE_FILTER_NAME} from '../../../../../constants/settings';
import {loadCarList, setPreloader} from '../../../../../store/actionCreators';
import {getPreloader} from '../../../../../store/selectors';
import './CarList.scss';

function CarList() {
    const [error, setError] = useState(null);

    const location = useLocation();
    const dispatch = useDispatch();
    const preloader = useSelector(getPreloader);

    useEffect(() => {
        // Предотвращаем выполнение ненужных действий, если компонент размонтирован
        if (!location.pathname.startsWith(`/${ADMIN_APP_URL}/${CAR_LIST_APP_URL}`)) return;

        const params = new URLSearchParams(location.search);
        const page = params.get(PAGE_FILTER_NAME);

        dispatch(setPreloader(true));
        setError(null);
        dispatch(loadCarList(page))
            .catch(err => setError(err))
            .finally(() => dispatch(setPreloader(false)));

    }, [location])

    if (error) return <ErrorPane error={error}/>;

    const hasReadyData = () => !preloader;

    return (
        <div className="car_list">
            <h1 className="car_list__caption">Автомобили</h1>
            {hasReadyData() &&
                <>
                    Здесь выводится список моделей авто
                </>
            }
        </div>
    );
}

export default CarList;