import React from 'react';
import PropTypes from 'prop-types';
import PhotoBlock from '../../../../common/PhotoBlock/PhotoBlock';
import CarCardDescription from '../CarCardDescription/CarCardDescription';
import './CarCard.scss';

function CarCard({car}){
    return (
        <li className="car_card">
            <PhotoBlock photoPath={car.thumbnail.path}/>
            <CarCardDescription car={car}/>
        </li>
    );
}

CarCard.propTypes = {
    car: PropTypes.object
}

export default CarCard;