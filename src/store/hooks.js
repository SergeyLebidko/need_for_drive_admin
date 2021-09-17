import {useDispatch, useSelector} from 'react-redux';
import {setError, setPreloader} from './actionCreators';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {getFrame} from './selectors';
import {ADMIN_APP_URL} from '../constants/urls';
import {PAGE_FILTER_NAME} from '../constants/settings';

export function useGlobalPreloader() {
    const dispatch = useDispatch();
    const showPreloader = () => dispatch(setPreloader(true));
    const hidePreloader = () => dispatch(setPreloader(false));
    return [showPreloader, hidePreloader];
}

export function useGlobalError() {
    const dispatch = useDispatch();
    const showError = (description, handler) => dispatch(setError({description, handler}));
    const hideError = () => dispatch(setError(false));
    return [showError, hideError];
}

export function useListLoader(listAppUrl, filterNames, loaderFunc) {
    const [done, setDone] = useState(false);
    const [error, setError] = useState(null);

    const location = useLocation();
    const dispatch = useDispatch();

    const [showGlobalPreloader, hideGlobalPreloader] = useGlobalPreloader();

    const frame = useSelector(getFrame);
    let items;
    if (frame) items = frame.data;

    useEffect(() => {
        // Предотвращаем выполнение ненужных действий, если компонент размонтирован
        if (!location.pathname.startsWith(`/${ADMIN_APP_URL}/${listAppUrl}`)) return;

        const params = new URLSearchParams(location.search);
        const filterValues = [];
        const page = params.get(PAGE_FILTER_NAME);
        for (const filterName of filterNames) filterValues.push(params.get(filterName));

        showGlobalPreloader();
        setError(null);
        setDone(false);
        dispatch(loaderFunc(...[page, ...filterValues]))
            .catch(err => setError(err))
            .finally(() => {
                hideGlobalPreloader();
                setDone(true);
            });

    }, [location, dispatch]);

    return [done, error, items];
}