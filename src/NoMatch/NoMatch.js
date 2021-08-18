import React from 'react';
import {useLocation} from 'react-router-dom';
import './NoMatch.scss';

function NoMatch() {
    const location = useLocation();

    return (
        <div className="no_match">
            Страница {location.pathname} не найдена
        </div>
    )
}

export default NoMatch;