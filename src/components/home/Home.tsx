import React, { useState, useEffect } from 'react';
import dependenciesContainer from '../../common/di/DependencyContainer';
import DeviceService from '../../common/devices/DeviceService';
import DeviceDomain from '../../types/domain/Device';
import { useFilter } from '../common/context/FilterContext';
import Device from '../device/Device';

import './Home.scss';

// TODO - this component needs improvement - remove device service dependency
const Home: React.FC = () => {
    const deviceService = dependenciesContainer.get(DeviceService);
    const { selectedDevices } = useFilter();
    const [selected, setSelected] = useState<DeviceDomain[]>([]);

    useEffect(() => {
        setSelected(deviceService.getSelectedDevices());
    }, []);

    useEffect(() => {
        setSelected(selectedDevices);
    }, [selectedDevices]);

    return (
        <div className="Home">
            <div className="Devices">
                {selected.map((device) => {
                    return <Device key={device.name} device={device} />;
                })}
            </div>
        </div>
    );
};

export default React.memo(Home);
