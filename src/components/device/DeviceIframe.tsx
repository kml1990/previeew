import React, { useState, useEffect } from 'react';
import { Orientation } from '../../types/Orientation';
import { useDeviceSettings } from '../device_settings/SettingsContext';

import './DeviceIframe.scss';

export interface DeviceIframeProps {
    name: string;
    orientation: Orientation;
    height: number;
    width: number;
}

const DeviceIframe: React.FC<DeviceIframeProps> = ({ name, orientation, height, width }) => {
    const { url, zoom } = useDeviceSettings();
    const [searchUrl, setSearchUrl] = useState<string>();

    useEffect(() => {
        if (url !== searchUrl) {
            setSearchUrl(url);
        }
    }, [url]);

    const deviceObjectStyle = {
        height: orientation === Orientation.PORTRAIT ? height : width,
        width: orientation === Orientation.PORTRAIT ? width : height,
    };

    const frameProps = {
        style: {
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top left',
            ...deviceObjectStyle,
        },
        width: `${deviceObjectStyle.width}px`,
        height: `${deviceObjectStyle.height}px`,
    };

    const deviceOrientationClass = `Device--${orientation}`;

    return (
        <div className={`DeviceIframe ${deviceOrientationClass}`} style={deviceObjectStyle}>
            <iframe
                className="DeviceIframe__iframe shadow-sm"
                title={name}
                src={searchUrl}
                {...frameProps}
            />
        </div>
    );
};

export default React.memo(DeviceIframe);
