import React from 'react';
import {Link, useLocation, useRouteMatch} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getFrame} from '../../store/selectors';
import {LIMIT, PAGE_FILTER_NAME} from '../../settings';
import './Paginator.scss';

function Paginator() {
    let {url: baseLink} = useRouteMatch();
    const location = useLocation();
    const {page, count} = useSelector(getFrame);

    const params = new URLSearchParams(location.search);

    const firstPageNumber = 0;
    const lastPageNumber = count % LIMIT ? Math.floor(count / LIMIT) : Math.floor(count / LIMIT) - 1;

    let hasFirstDot = false;
    let hasSecondDot = false;

    const linksContent = [];
    if (page > 0) {
        params.set(PAGE_FILTER_NAME, '' + (page - 1));
        linksContent.push(<Link key="to_next_page" to={`${baseLink}?${params}`}>&laquo;</Link>);
    }

    for (let pageNumber = 0; pageNumber <= lastPageNumber; pageNumber++) {
        if (pageNumber === page) {
            linksContent.push(<span key={pageNumber}>{pageNumber + 1}</span>);
            continue;
        }

        if ((pageNumber === firstPageNumber) || (pageNumber === lastPageNumber) || (pageNumber === (page - 1)) || (pageNumber === (page + 1))) {
            params.set(PAGE_FILTER_NAME, '' + pageNumber);
            linksContent.push(<Link key={pageNumber} to={`${baseLink}?${params}`}>{pageNumber + 1}</Link>);
            continue;
        }

        if (pageNumber > firstPageNumber && pageNumber < (page - 1) && !hasFirstDot) {
            params.set(PAGE_FILTER_NAME, '' + (page - 2));
            linksContent.push(<Link key={pageNumber} to={`${baseLink}?${params}`}>...</Link>);
            hasFirstDot = true;
            continue;
        }

        if (pageNumber < lastPageNumber && pageNumber > (page + 1) && !hasSecondDot) {
            params.set(PAGE_FILTER_NAME, '' + (page + 2));
            linksContent.push(<Link key={pageNumber} to={`${baseLink}?${params}`}>...</Link>);
            hasSecondDot = true;
        }
    }

    if (page < lastPageNumber) {
        params.set(PAGE_FILTER_NAME, '' + (page + 1));
        linksContent.push(<Link key="to_prev_page" to={`${baseLink}?${params}`}>&raquo;</Link>);
    }

    return (
        <div className="paginator">
            {linksContent}
        </div>
    );
}

export default Paginator;