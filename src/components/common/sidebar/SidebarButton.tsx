import React, { ReactElement } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import './SidebarButton.scss';

export enum PopoverPlacement {
    TOP = 'top',
    RIGHT = 'right',
    BOTTOM = 'bottom',
    LEFT = 'left',
}

export interface SidebarButtonProps {
    name: string;
    title: string;
    icon: IconProp;
    placement?: PopoverPlacement;
    className?: string;
    children?: ReactElement;
    onMenuOpen: (menu: string) => void;
    onMenuClose: (menu: string) => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
    name,
    title,
    placement = PopoverPlacement.RIGHT,
    className,
    icon,
    children,
    onMenuOpen,
    onMenuClose,
}) => {
    const popover = (
        <Popover id={title} className="SidebarButton__popover shadow">
            <Popover.Title className="SidebarButton__popoverTitle" as="h3">
                {title}
            </Popover.Title>
            <Popover.Content className="SidebarButton__popoverContent">{children}</Popover.Content>
        </Popover>
    );

    return (
        <div className={`SidebarButton ${className}`}>
            <OverlayTrigger
                trigger="click"
                placement={placement}
                overlay={popover}
                onExiting={() => onMenuClose(name)}
                rootClose
            >
                <button
                    type="button"
                    className="Sidebar__menuItem"
                    onClick={() => onMenuOpen(name)}
                >
                    <FontAwesomeIcon className="Sidebar__menuIcon" icon={icon} />
                </button>
            </OverlayTrigger>
        </div>
    );
};

export default React.memo(SidebarButton);
