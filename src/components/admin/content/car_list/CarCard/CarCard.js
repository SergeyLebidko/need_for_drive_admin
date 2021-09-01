import React from 'react';
import PropTypes from 'prop-types';
import './CarCard.scss';

function CarCard({car}){
    return (
        <li>
            {car.name}
        </li>
    );
}

CarCard.propTypes = {
    car: PropTypes.object
}

export default CarCard;