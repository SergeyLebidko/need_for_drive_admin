import {useDispatch} from 'react-redux';
import {setError, setPreloader} from './actionCreators';

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