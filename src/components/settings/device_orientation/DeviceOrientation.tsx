import React from 'react';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { Orientation } from '../../../types/Orientation';
import { useSettings } from '../../common/context/SettingsContext';
import Button, { ButtonVariant } from '../../common/button/Button';

import './DeviceOrientation.scss';

export interface DeviceOrientationProps {
    className?: string;
}

export const DEFAULT_DEVICE_ORIENTATION = Orientation.PORTRAIT;

const DeviceOrientation: React.FC<DeviceOrientationProps> = ({ className = '' }) => {
    const { orientation, setOrientation } = useSettings();

    return (
        <div className={`DeviceOrientation ${className}`}>
            <Button
                className="DeviceOrientation__button DeviceOrientation__portrait"
                variant={ButtonVariant.SECONDARY}
                icon={faMobileAlt}
                active={orientation === Orientation.PORTRAIT}
                onClick={() => setOrientation(Orientation.PORTRAIT)}
            />
            <Button
                className="DeviceOrientation__button DeviceOrientation__landscape"
                variant={ButtonVariant.SECONDARY}
                icon={faMobileAlt}
                active={orientation === Orientation.LANDSCAPE}
                onClick={() => setOrientation(Orientation.LANDSCAPE)}
            />
        </div>
    );
};

export default React.memo(DeviceOrientation);
