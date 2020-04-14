import React, { useState, useEffect } from 'react';
import DeviceDomain from '../../types/domain/Device';
import { useFilter } from '../common/context/FilterContext';
import Device from '../device/Device';

import './Home.scss';

const Home: React.FC = () => {
    const { selectedDevices } = useFilter();
    const [selected, setSelected] = useState<DeviceDomain[]>([]);

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
