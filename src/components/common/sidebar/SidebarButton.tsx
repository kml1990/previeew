import React, { ReactElement } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import useBackdrop from '../../../common/hooks/UseBackdrop';

import './SidebarButton.scss';

export enum PopoverPlacement {
    TOP = 'top',
    RIGHT = 'right',
    BOTTOM = 'bottom',
    LEFT = 'left',
}

export interface SidebarButtonProps {
    title: string;
    icon: IconProp;
    placement?: PopoverPlacement;
    className?: string;
    children?: ReactElement;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
    title,
    placement = PopoverPlacement.RIGHT,
    className,
    icon,
    children,
}) => {
    const [toggleBackdrop] = useBackdrop();

    const onClick = () => {
        toggleBackdrop();
    };

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
                onExiting={onClick}
                rootClose
            >
                <button type="button" className="Sidebar__menuItem" onClick={onClick}>
                    <FontAwesomeIcon className="Sidebar__menuIcon" icon={icon} />
                </button>
            </OverlayTrigger>
        </div>
    );
};

export default React.memo(SidebarButton);
