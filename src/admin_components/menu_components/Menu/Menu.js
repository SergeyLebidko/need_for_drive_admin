import React, {useState} from 'react';
import classNames from 'classnames';
import MenuItems from '../MenuItems/MenuItems';
import BrandStamp, {SMALL_STAMP} from '../../../common_components/BrandStamp/BrandStamp';
import MenuButton from '../MenuButton/MenuButton';
import './Menu.scss';

function Menu() {
    let [hasOpened, setHasOpened] = useState(false);

    const menuClasses = classNames('menu', {'opened_menu': hasOpened, 'closed_menu': !hasOpened});

    const handleMenuButtonClick = () => setHasOpened(oldVal => !oldVal);
    const handleMenuItemClick = () => setHasOpened(false);

    return (
        <nav className={menuClasses}>
            <header className="menu__header">
                <MenuButton hasOpened={hasOpened} handleClick={handleMenuButtonClick}/>
                <BrandStamp size={SMALL_STAMP}/>
            </header>
            <MenuItems handleMenuItemClick={handleMenuItemClick}/>
        </nav>
    )
}

export default Menu;