import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useRouteMatch} from 'react-router-dom';
import CarPhotoChooser from '../CarPhotoChooser/CarPhotoChooser';
import ErrorPane from '../../../../common/ErrorPane/ErrorPane';
import EditorControlBlock from '../../../../common/EditorControlBlock/EditorControlBlock';
import CarTankViewer from '../CarTankViewer/CarTankViewer';
import CarDescription from '../CarDescription/CarDescription';
import TextValueEditor from '../../../../common/TextValueEditor/TextValueEditor';
import CatalogSelector from '../../../../common/CatalogSelector/CatalogSelector';
import CarColors from '../CarColors/CarColors';
import {useEntityLoader, useGlobalPreloader} from '../../../../../store/hooks';
import {initNewCar, loadCar, removeCar, saveCar, setPopupMessage} from '../../../../../store/actionCreators';
import {FAIL, SUCCESS, CAR_CATEGORY_CATALOG} from '../../../../../constants/settings';
import {ADMIN_APP_URL, CAR_EDIT_APP_URL, CAR_LIST_APP_URL} from '../../../../../constants/urls';
import {isWholePositiveOrZero} from '../../../../../utils/common_utils';
import {
    getEntity,
    getCarName,
    getPriceMin,
    getPriceMax,
    getCarNumber,
    getCarTank,
    getCarCategory
} from '../../../../../store/selectors';
import './Car.scss';

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
    const [tankError, setTankError] = useState(null);
    const [colorsError, setColorsError] = useState(null);

    const {params: {id}} = useRouteMatch();
    const history = useHistory();

    // Блок функций сброса ошибок
    const resetThumbnailError = () => setThumbnailError(null);
    const resetNameError = () => setNameError(null);
    const resetCategoryError = () => setCategoryError(null);
    const resetPriceMinError = () => setPriceMinError(null);
    const resetPriceMaxError = () => setPriceMaxError(null);
    const resetTankError = () => setTankError(null);
    const resetColorsError = () => setColorsError(null);

    const resetAllErrors = () => {
        resetThumbnailError();
        resetNameError();
        resetCategoryError();
        resetPriceMinError();
        resetPriceMaxError();
        resetTankError();
        resetColorsError();
    }

    // Загружаем автомобиль для редактирования или создаем новый, если нужно
    useEntityLoader(setDone, setError, resetAllErrors, loadCar, initNewCar);

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

        const hasTankError = car.tank !== '' && (!isWholePositiveOrZero(car.tank) || car.tank > 100);
        if (hasTankError) setTankError("Введите корректный уровень топлива (от 0 до 100%)");

        if (!car.colors.length) setColorsError('Выберите или введите хотя бы один цвет');

        if (!car.thumbnail || !car.name || !car.categoryId || priceError || hasTankError || !car.colors.length) return;

        // Пытаемся выполнить сохранение. Если сохраняли новый автомобиль, то переходим на страницу редактирования
        showPreloader();
        setError(null);
        dispatch(saveCar(car))
            .then(savedId => {
                dispatch(setPopupMessage(SUCCESS, 'Автомобиль успешно сохранен'));
                if (!id) history.push(`/${ADMIN_APP_URL}/${CAR_EDIT_APP_URL}/${savedId}`);
            })
            .catch(err => setError(err))
            .finally(() => hidePreloader());
    }

    const handleCancelButtonClick = () => {
        if (id) {
            history.push(`/${ADMIN_APP_URL}/${CAR_LIST_APP_URL}`);
            return;
        }
        history.push(`/${ADMIN_APP_URL}`);
    }

    const handleRemoveButtonClick = () => {
        // Не даем выполнить удаление, если редактируем данные нового авто и машина еще не сохранена
        if (!id) {
            dispatch(setPopupMessage(FAIL, 'Нельзя удалить не сохраненный автомобиль'));
            return;
        }

        showPreloader();
        setDone(false);
        setError(null);
        dispatch(removeCar(id))
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
                    <div className="car__settings_block">
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
                            fieldGetter={getCarCategory}
                            errorText={categoryError}
                            resetErrorText={resetCategoryError}
                            nameExtractor={category => `${category.name} (${category.description})`}
                        />
                    </div>
                    <div className="car__settings_block">
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
                    <div className="car__settings_block">
                        <TextValueEditor
                            label="Гос. номер"
                            getValue={getCarNumber}
                            entityField="number"
                        />
                        <TextValueEditor
                            label="Уровень топлива"
                            getValue={getCarTank}
                            entityField="tank"
                            errorText={tankError}
                            resetErrorText={resetTankError}
                        />
                    </div>
                    <CarColors errorText={colorsError} resetErrorText={resetColorsError}/>
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