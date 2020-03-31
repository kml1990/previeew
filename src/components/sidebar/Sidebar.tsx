import React from 'react';
import { OnMenuToggleCallback } from '../app/App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import './Sidebar.scss';

export interface SidebarProps {
    className: string;
    onMenuToggle: OnMenuToggleCallback;
}

const Sidebar: React.FC<SidebarProps> = ({ className, onMenuToggle }) => {
    return (
        <aside className={className}>
            <button role="button" className="Sidebar__menuButton" onClick={onMenuToggle}>
                <FontAwesomeIcon className="Sidebar__menuIcon" icon={faBars} />
            </button>
        </aside>
    );
};

export default React.memo(Sidebar);
