import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { DeviceType } from '../../types/domain/Device';
import { Orientation } from '../../types/Orientation';

import './DeviceSettings.scss';

export interface DeviceSettingsProps {
    type: DeviceType;
    onOrientationToggle: () => void;
}

const DeviceSettings: React.FC<DeviceSettingsProps> = ({ onOrientationToggle }) => {
    const [orientation, setOrientation] = useState<Orientation>(Orientation.PORTRAIT);

    const onOrientationClick = () => {
        const newOrientation =
            orientation === Orientation.PORTRAIT ? Orientation.LANDSCAPE : Orientation.PORTRAIT;
        setOrientation(newOrientation);
        onOrientationToggle();
    };

    const deviceOrientationClass = `DeviceSettings__orientation--${orientation}`;

    return (
        <div className="DeviceSettings">
            <button
                type="button"
                className={`DeviceSettings__orientation ${deviceOrientationClass}`}
                onClick={onOrientationClick}
            >
                <FontAwesomeIcon className="DeviceSettings__mobileIcon " icon={faMobileAlt} />
            </button>
        </div>
    );
};

export default React.memo(DeviceSettings);
