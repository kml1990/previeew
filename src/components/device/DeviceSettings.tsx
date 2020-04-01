import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { DeviceType } from '../../types/domain/Device';

import './DeviceSettings.scss';

export interface DeviceSettingsProps {
    type: DeviceType;
    onOrientationToggle: () => void;
}

const DeviceSettings: React.FC<DeviceSettingsProps> = ({ onOrientationToggle }) => {

    return (
        <div className="DeviceSettings">
            <button type="button" onClick={onOrientationToggle}>
                <FontAwesomeIcon className="DeviceSettings__mobileIcon" icon={faMobileAlt} />
            </button>
        </div>
    );
};

export default React.memo(DeviceSettings);
