import React from 'react';
import PropTypes from 'prop-types';
import CarCardPhoto from '../CarCardPhoto/CarCardPhoto';
import CarCardDescription from '../CarCardDescription/CarCardDescription';
import './CarCard.scss';

function CarCard({car}){
    return (
        <li>
            <CarCardPhoto car={car}/>
            <CarCardDescription car={car}/>
        </li>
    );
}

CarCard.propTypes = {
    car: PropTypes.object
}

export default CarCard;