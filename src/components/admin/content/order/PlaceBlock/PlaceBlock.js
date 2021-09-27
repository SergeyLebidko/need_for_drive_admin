import React from 'react';
import PropTypes from 'prop-types';
import CatalogSelector from '../../../../common/CatalogSelector/CatalogSelector';
import {getOrderCity, getOrderPoint} from '../../../../../store/selectors';
import {CITY_LIST_CATALOG, POINT_LIST_CATALOG} from '../../../../../constants/settings';
import './PlaceBlock.scss';

function PlaceBlock({cityErrorText, pointErrorText, resetCityErrorText, resetPointErrorText}) {

    const listCreatorForPointSelector = (catalog, value) => {
        // Выстраиваем список пунктов выдачи так, чтобы он был отсортирован по городу.
        // Делаем это здесь так как, к сожалению, API не позволяет проводить сортировку по связанным записям.
        // Также учитываем, что есть пункты выдачи, для которых город не указан. Их ставим в начало списка и сортируем по адресу
        const pointNoCity = catalog.filter(point => !point.cityId);
        const pointWithCity = catalog.filter(point => !!point.cityId);

        const addressComparator = (a, b) => {
            if (a.address.toLowerCase() < b.address.toLowerCase()) return -1;
            if (a.address.toLowerCase() > b.address.toLowerCase()) return 1;
            return 0;
        }

        pointNoCity.sort(addressComparator);

        // В пределах одного города пункты выдачи будут отсортированы лексикографически по адресу
        pointWithCity.sort((a, b) => {
            if (a.cityId.name.toLowerCase() < b.cityId.name.toLowerCase()) return -1;
            if (a.cityId.name.toLowerCase() > b.cityId.name.toLowerCase()) return 1;
            return addressComparator(a, b);
        });

        const nextList = [...pointNoCity, ...pointWithCity];
        if (!value) nextList.unshift(null);

        return nextList;
    }

    const pointNameExtractor = point => `(${point.cityId ? point.cityId.name : 'не указан'}) ${point.address}`;

    const extractDataForEntity = value => {
        if ('address' in value) return {id: value.id, name: value.name, address: value.address};
        return {id: value.id, name: value.name};
    }

    return (
        <div className="place_block">
            <CatalogSelector
                label="Город"
                catalogName={CITY_LIST_CATALOG}
                fieldGetter={getOrderCity}
                entityField="cityId"
                errorText={cityErrorText}
                resetErrorText={resetCityErrorText}
                entityDataExtractor={extractDataForEntity}
            />
            <CatalogSelector
                label="Пункт выдачи"
                catalogName={POINT_LIST_CATALOG}
                fieldGetter={getOrderPoint}
                entityField="pointId"
                errorText={pointErrorText}
                resetErrorText={resetPointErrorText}
                nameExtractor={pointNameExtractor}
                entityDataExtractor={extractDataForEntity}
                itemsListCreator={listCreatorForPointSelector}
            />
        </div>
    );
}

PlaceBlock.propTypes = {
    cityErrorText: PropTypes.string,
    pointErrorText: PropTypes.string,
    resetCityErrorText: PropTypes.func,
    resetPointErrorText: PropTypes.func
}

export default PlaceBlock;