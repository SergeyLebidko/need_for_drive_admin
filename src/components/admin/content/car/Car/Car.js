import React from 'react';
import './Car.scss';

function Car() {
    return (
        <div className="car">
            <h1 className="car__caption">Карточка автомобиля</h1>
            <div className="car__content_wrapper">
                <div className="car__content car__first_content_block">
                    Фото
                </div>
                <div className="car__content car__second_content_block">
                    Параметры
                </div>
            </div>
        </div>
    );
}

export default Car;