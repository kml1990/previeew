import React, { useState, useEffect } from 'react';
import dependenciesContainer from '../../common/di/DependencyContainer';
import DeviceService from '../../common/devices/DeviceService';
import Device from '../../types/domain/Device';

import './Home.scss';
import DeviceFrame from '../device_frame/DeviceFrame';

const Home: React.FC = () => {
    const deviceService = dependenciesContainer.get(DeviceService);
    const [devices, setDevices] = useState<Device[]>([]);

    useEffect(() => {
        setDevices(deviceService.devices);
    }, []);

    return (
        <div className="Home">
            {devices.map((device) => {
                return <DeviceFrame key={device.name} device={device} />;
            })}
        </div>
    );
};

export default React.memo(Home);
