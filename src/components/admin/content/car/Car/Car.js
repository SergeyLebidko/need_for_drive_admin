import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useLocation, useRouteMatch} from 'react-router-dom';
import CarPhotoChooser from '../CarPhotoChooser/CarPhotoChooser';
import ErrorPane from '../../../../common/ErrorPane/ErrorPane';
import EditorControlBlock from '../../../../common/EditorControlBlock/EditorControlBlock';
import CarTankViewer from '../CarTankViewer/CarTankViewer';
import CarDescription from '../CarDescription/CarDescription';
import TextValueEditor from '../../../../common/TextValueEditor/TextValueEditor';
import CatalogSelector from '../../../../common/CatalogSelector/CatalogSelector';
import {useGlobalPreloader} from '../../../../../store/hooks';
import {loadCar, removeCar, saveCar, setEntity, setPopupMessage} from '../../../../../store/actionCreators';
import {getEntity, getCarName, getPriceMin, getPriceMax} from '../../../../../store/selectors';
import {FAIL, SUCCESS, CAR_CATEGORY_CATALOG} from '../../../../../constants/settings';
import {ADMIN_APP_URL, CAR_EDIT_APP_URL, CAR_LIST_APP_URL} from '../../../../../constants/urls';
import './Car.scss';
import {isWholePositiveOrZero} from "../../../../../utils/common_utils";

function Car() {
    const [done, setDone] = useState(false);
    const [error, setError] = useState(null);
    const [showPreloader, hidePreloader] = useGlobalPreloader();

    const dispatch = useDispatch();
    const car = useSelector(getEntity);

    const [thumbnailError, setThumbnailError] = useState(null);
    const [nameError, setNameError] = useState(null);
    const [categoryError, setCategoryError] = useState(null);
    const [priceMinError, setPriceMinError] = useState(null);
    const [priceMaxError, setPriceMaxError] = useState(null);

    const location = useLocation();
    const {params: {carId}} = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        setDone(false);
        setError(null);

        // Если идентификатор автомобиля не указан в URL, то инициализируем пустую новую сущность в хранилище
        if (!carId) {
            dispatch(setEntity({}));
            setDone(true);
            return;
        }

        // Если идентификатор автомобиля найден - пытаемся загрузить данные о нём
        showPreloader();
        dispatch(loadCar(carId))
            .catch(err => setError(err))
            .finally(() => {
                setDone(true);
                hidePreloader();
            });
    }, [location, carId]);

    // Блок функций сброса ошибок
    const resetThumbnailError = () => setThumbnailError(null);
    const resetNameError = () => setNameError(null);
    const resetCategoryError = () => setCategoryError(null);
    const resetPriceMinError = () => setPriceMinError(null);
    const resetPriceMaxError = () => setPriceMaxError(null);

    // Блок обработчиков кликов
    const handleSaveButtonClick = () => {
        if (!car.thumbnail) setThumbnailError('Выберите фото автомобиля');
        if (!car.name) setNameError('Введите название модели');
        if (!car.categoryId) setCategoryError('Выберите тип автомобиля');

        const priceMinError = !isWholePositiveOrZero(car.priceMin);
        const priceMaxError = !isWholePositiveOrZero(car.priceMax);
        const priceError = priceMinError || priceMaxError;
        if (priceMinError) setPriceMinError("Некорректное значение начальной цены");
        if (priceMaxError) setPriceMaxError("Некорректное значение конечной цены");
        if (!car.thumbnail || !car.name || !car.categoryId || priceError) return;

        // Пытаемся выполнить сохранение. Если сохраняли новый автомобиль, то переходим на страницу редактирования
        showPreloader();
        setError(null);
        dispatch(saveCar(car))
            .then(() => {
                dispatch(setPopupMessage(SUCCESS, 'Автомобиль успешно сохранен'));
                if (!carId) history.push(`/${ADMIN_APP_URL}/${CAR_EDIT_APP_URL}/${car.id}`);
            })
            .catch(err => setError(err))
            .finally(() => hidePreloader());
    }

    const handleCancelButtonClick = () => {
        if (carId) {
            history.push(`/${ADMIN_APP_URL}/${CAR_LIST_APP_URL}`);
            return
        }
        history.push(`/${ADMIN_APP_URL}`);
    }

    const handleRemoveButtonClick = () => {
        // Не даем выполнить удаление, если редактируем данные нового авто и машина еще не сохранена
        if (!carId) {
            dispatch(setPopupMessage(FAIL, 'Нельзя удалить не сохраненный автомобиль'));
            return;
        }

        showPreloader();
        setDone(false);
        setError(null);
        dispatch(removeCar(carId))
            .then(() => {
                dispatch(setPopupMessage(SUCCESS, 'Автомобиль успешно удален'));
                history.push(`/${ADMIN_APP_URL}`);
            })
            .catch(err => {
                setError(err);
                setDone(true);
            })
            .finally(() => hidePreloader());
    }

    if (error) return <ErrorPane error={error}/>;

    return (
        <div className="car">
            <h1 className="car__caption">Карточка автомобиля</h1>
            {done &&
            <div className="car__content_wrapper">
                <div className="car__content car__first_content_block">
                    <CarPhotoChooser errorText={thumbnailError} resetErrorText={resetThumbnailError}/>
                    <div className="car__description_block">
                        <CarTankViewer/>
                        <CarDescription/>
                    </div>
                </div>
                <div className="car__content car__second_content_block">
                    <h1 className="car__settings_caption">Настройки автомобиля</h1>
                    <div>
                        <TextValueEditor
                            label="Модель автомобиля"
                            getValue={getCarName}
                            entityField="name"
                            errorText={nameError}
                            resetErrorText={resetNameError}
                        />
                        <CatalogSelector
                            label="Тип автомобиля"
                            catalogName={CAR_CATEGORY_CATALOG}
                            entityField="categoryId"
                            errorText={categoryError}
                            resetErrorText={resetCategoryError}
                            nameExtractor={category => `${category.name} (${category.description})`}
                        />
                        <TextValueEditor
                            label="Начальная цена"
                            getValue={getPriceMin}
                            entityField="priceMin"
                            errorText={priceMinError}
                            resetErrorText={resetPriceMinError}
                        />
                        <TextValueEditor
                            label="Конечная цена"
                            getValue={getPriceMax}
                            entityField="priceMax"
                            errorText={priceMaxError}
                            resetErrorText={resetPriceMaxError}
                        />
                    </div>
                    <EditorControlBlock
                        handleSave={handleSaveButtonClick}
                        handleCancel={handleCancelButtonClick}
                        handleRemove={handleRemoveButtonClick}
                    />
                </div>
            </div>
            }
        </div>
    );
}

export default Car;