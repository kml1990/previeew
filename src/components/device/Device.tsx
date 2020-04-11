import React from 'react';
import { useInjection } from '../../common/di/DependencyContext';
import DeviceSettingsService from '../../common/devices/DeviceSettingsService';
import DeviceDomain from '../../types/domain/Device';
import DeviceIframe from './device_iframe/DeviceIframe';
import { useSettings } from '../common/context/SettingsContext';

import './Device.scss';

export interface DeviceProps {
    device: DeviceDomain;
}

const Device: React.FC<DeviceProps> = ({ device: { name, height, width, pixelRatio } }) => {
    const deviceSettingsService = useInjection(DeviceSettingsService);
    const { zoom, orientation } = useSettings();

    const deviceHeight = DeviceSettingsService.getSize(height, pixelRatio);
    const deviceWidth = DeviceSettingsService.getSize(width, pixelRatio);
    const deviceStyle = deviceSettingsService.getSizeBasedOnSettings(
        deviceHeight,
        deviceWidth,
        orientation,
        zoom,
    );

    const deviceOrientationClass = `Device--${orientation}`;

    return (
        <div className={`Device ${deviceOrientationClass}`} style={deviceStyle}>
            <span className="Device__name">{`${name} (${height} / ${width})`}</span>
            <DeviceIframe
                name={name}
                orientation={orientation}
                height={deviceHeight}
                width={deviceWidth}
            />
        </div>
    );
};

export default React.memo(Device);
