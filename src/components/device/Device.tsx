import React, { useState } from 'react';
import DeviceDomain from '../../types/domain/Device';

import './Device.scss';
import { Orientation } from '../../types/Orientation';
import DeviceSettings from './DeviceSettings';

export interface DeviceFrameProps {
    device: DeviceDomain;
    zoom?: number;
}

const HIGH_DPI = 150;
const DEFAULT_ZOOM_OUT_DIVIDER = 0.5;

const Device: React.FC<DeviceFrameProps> = ({ device, zoom = DEFAULT_ZOOM_OUT_DIVIDER }) => {
    const [orientation, setOrientation] = useState<Orientation>(Orientation.PORTRAIT);

    const { name, type, height, width, pixelsPerInch } = device;
    const devicePixelRatio = Math.round(pixelsPerInch / HIGH_DPI);

    const deviceHeight = (height / devicePixelRatio) * zoom;
    const deviceWidth = (width / devicePixelRatio) * zoom;

    const deviceStyle = {
        width: orientation === Orientation.PORTRAIT ? deviceWidth : deviceHeight,
    };

    const deviceObjectStyle = {
        height: orientation === Orientation.PORTRAIT ? deviceHeight : deviceWidth,
        width: orientation === Orientation.PORTRAIT ? deviceWidth : deviceHeight,
    };

    const onOrientationToggle = () => {
        const newOrientation =
            orientation === Orientation.PORTRAIT ? Orientation.LANDSCAPE : Orientation.PORTRAIT;
        setOrientation(newOrientation);
    };

    const deviceOrientationClass = `Device--${orientation}`;

    return (
        <div className={`Device ${deviceOrientationClass}`} style={deviceStyle}>
            <DeviceSettings type={type} onOrientationToggle={onOrientationToggle} />
            <span className="Device__name">{`${name} - ${height} / ${width}`}</span>
            <div className="Device__object" style={deviceObjectStyle}>
                foo
            </div>
        </div>
    );
};

export default React.memo(Device);
