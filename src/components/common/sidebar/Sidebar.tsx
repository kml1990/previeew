import React, { useState, useEffect } from 'react';
import { faMobileAlt, faSearch, faFilter, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import SidebarButton from './SidebarButton';
import DeviceZoom from '../../settings/device_zoom/DeviceZoom';
import UrlSearch from '../../settings/url_search/UrlSearch';
import DeviceOrientation from '../../settings/device_orientation/DeviceOrientation';
import DeviceFilter from '../../filters/DeviceFilter';
import useBackdrop from '../../../common/hooks/UseBackdrop';

import './Sidebar.scss';

export interface SidebarProps {
    className: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
    const [menuOpened, setMenuOpened] = useState<string>('');
    const { setBackdropVisible } = useBackdrop();

    const onMenuOpen = (menu: string) => {
        if (menuOpened !== menu) {
            setMenuOpened(menu);
        }
    };

    const onMenuClose = (menu: string) => {
        if (menuOpened === menu) {
            setMenuOpened('');
        }
    };

    useEffect(() => {
        if (menuOpened !== '') {
            setBackdropVisible(true);
            return;
        }
        setBackdropVisible(false);
    }, [menuOpened]);

    return (
        <aside className={`Sidebar ${className}`}>
            <div className="Sidebar__menu">
                <SidebarButton
                    name="search"
                    title="Search"
                    icon={faSearch}
                    className="Sidebar__menuItem"
                    onMenuOpen={onMenuOpen}
                    onMenuClose={onMenuClose}
                >
                    <UrlSearch />
                </SidebarButton>
                <SidebarButton
                    name="filters"
                    title="Filters"
                    icon={faFilter}
                    className="Sidebar__menuItem"
                    onMenuOpen={onMenuOpen}
                    onMenuClose={onMenuClose}
                >
                    <DeviceFilter />
                </SidebarButton>
                <SidebarButton
                    name="orientation"
                    title="Orientation"
                    icon={faMobileAlt}
                    className="Sidebar__menuItem"
                    onMenuOpen={onMenuOpen}
                    onMenuClose={onMenuClose}
                >
                    <DeviceOrientation />
                </SidebarButton>
                <SidebarButton
                    name="zoom"
                    title="Device zoom"
                    icon={faSearchPlus}
                    className="Sidebar__menuItem"
                    onMenuOpen={onMenuOpen}
                    onMenuClose={onMenuClose}
                >
                    <DeviceZoom />
                </SidebarButton>
            </div>
        </aside>
    );
};

export default React.memo(Sidebar);
