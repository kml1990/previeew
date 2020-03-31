import React from 'react';
import Device from '../../types/domain/Device';

import './DeviceFrame.scss';

export interface DeviceFrameProps {
    device: Device;
}

const DeviceFrame: React.FC<DeviceFrameProps> = ({ device }) => {
    const { name } = device;
    return (
        <div className="DeviceFrame">
            <h5>{name}</h5>
        </div>
    );
};

export default React.memo(DeviceFrame);
