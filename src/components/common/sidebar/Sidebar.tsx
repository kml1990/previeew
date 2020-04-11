import React from 'react';
import { faMobileAlt, faSearch, faFilter, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import SidebarButton from './SidebarButton';
import DeviceZoom from '../../settings/device_zoom/DeviceZoom';
import UrlSearch from '../../settings/url_search/UrlSearch';
import DeviceOrientation from '../../settings/device_orientation/DeviceOrientation';
import DeviceFilter from '../../filters/DeviceFilter';

import './Sidebar.scss';

export interface SidebarProps {
    className: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
    return (
        <aside className={`Sidebar ${className}`}>
            <div className="Sidebar__menu">
                <SidebarButton title="Search" icon={faSearch} className="Sidebar__menuItem">
                    <UrlSearch />
                </SidebarButton>
                <SidebarButton title="Filters" icon={faFilter} className="Sidebar__menuItem">
                    <DeviceFilter />
                </SidebarButton>
                <SidebarButton title="Orientation" icon={faMobileAlt} className="Sidebar__menuItem">
                    <DeviceOrientation />
                </SidebarButton>
                <SidebarButton
                    title="Device zoom"
                    icon={faSearchPlus}
                    className="Sidebar__menuItem"
                >
                    <DeviceZoom />
                </SidebarButton>
            </div>
        </aside>
    );
};

export default React.memo(Sidebar);
