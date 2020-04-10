import React, { useState, useEffect } from 'react';
import dependenciesContainer from '../../common/di/DependencyContainer';
import DeviceService from '../../common/devices/DeviceService';
import DeviceDomain from '../../types/domain/Device';
import Device from '../device/Device';

import './Home.scss';

const Home: React.FC = () => {
    const deviceService = dependenciesContainer.get(DeviceService);
    const [selectedDevices, setSelectedDevices] = useState<DeviceDomain[]>([]);

    useEffect(() => {
        setSelectedDevices(deviceService.getSelectedDevices());
    }, []);

    return (
        <div className="Home">
            <div className="Devices">
                {selectedDevices.map((device) => {
                    return <Device key={device.name} device={device} />;
                })}
            </div>
        </div>
    );
};

export default React.memo(Home);
