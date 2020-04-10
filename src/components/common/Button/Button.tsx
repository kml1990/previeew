import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import './Button.scss';

export type OnClickCallback = (...args: any) => void;

export enum ButtonVariant {
    PRIMARY = 'Button__primary',
    SECONDARY = 'Button__secondary',
}

export enum ButtonType {
    BUTTON = 'button',
    SUBMIT = 'submit',
    RESET = 'reset',
}

export interface ButtonProps {
    text?: string;
    variant?: ButtonVariant;
    icon?: IconProp;
    type?: ButtonType;
    className?: string;
    active?: boolean;
    onClick?: OnClickCallback;
}

const Button: React.FC<ButtonProps> = ({
    text = '',
    variant = ButtonVariant.PRIMARY,
    icon,
    className,
    type = ButtonType.BUTTON,
    active = false,
    onClick,
}) => {
    const activeClass = active ? `${variant}--active` : '';
    return (
        <button
            type={type}
            className={`Button ${variant} ${activeClass} ${className}`}
            onClick={onClick}
        >
            {icon && <FontAwesomeIcon className="Button__icon" icon={icon} />}
            {text && <span className="Button__text">{text}</span>}
        </button>
    );
};

export default React.memo(Button);
