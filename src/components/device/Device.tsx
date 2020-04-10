import React from 'react';
import { useInjection } from '../../common/di/DependencyContext';
import DeviceService from '../../common/devices/DeviceService';
import DeviceDomain from '../../types/domain/Device';
import DeviceIframe from './DeviceIframe';
import { useDeviceSettings } from '../device_settings/SettingsContext';

import './Device.scss';

export interface DeviceProps {
    device: DeviceDomain;
}

const Device: React.FC<DeviceProps> = ({ device: { name, height, width, pixelRatio } }) => {
    const deviceService = useInjection(DeviceService);
    const { zoom, orientation } = useDeviceSettings();

    const deviceHeight = deviceService.getSize(height, pixelRatio);
    const deviceWidth = deviceService.getSize(width, pixelRatio);
    const deviceStyle = deviceService.getSizeBasedOnSettings(
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
