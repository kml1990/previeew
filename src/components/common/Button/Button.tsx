import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import './Button.scss';

export type OnClickCallback = () => void;

export enum ButtonVariant {
    PRIMARY = 'Button__primary',
    SECONDARY = 'Button__secondary',
}

export enum ButtonRole {
    BUTTON = 'button',
    SUBMIT = 'submit',
}

export interface ButtonProps {
    text: string;
    variant: ButtonVariant;
    icon?: IconProp;
    className?: string;
    role?: ButtonRole,
    onClick: OnClickCallback;
}

const Button: React.FC<ButtonProps> = ({ text, variant = ButtonVariant.PRIMARY, icon, className, role = ButtonRole.BUTTON, onClick }) => {
    return (
        <button role={role} className={`Button ${variant} ${className}`} onClick={onClick}>
            {icon && <FontAwesomeIcon className="Button__icon" icon={icon} /> }
            <span className="Button__text">{text}</span>
        </button>
    );
};

export default React.memo(Button);
