import React, { useState, useEffect } from 'react';

import './DeviceFilter.scss';
import { useInjection } from '../../common/di/DependencyContext';
import DeviceService from '../../common/devices/DeviceService';

export interface DeviceFilterProps {
    className?: string;
}

const DeviceFilter: React.FC<DeviceFilterProps> = ({ className = '' }) => {
    const deviceService = useInjection(DeviceService);
    const [types, setTypes] = useState<string[]>();
    const [platforms, setPlatforms] = useState<string[]>();
    const [makes, setMakes] = useState<string[]>();

    console.log(types);
    console.log(platforms);
    console.log(makes);

    useEffect(() => {
        setPlatforms(deviceService.getPlatforms());
        setMakes(deviceService.getMakes());
    }, []);

    return (
        <div className={`DeviceFilter ${className}`}>
            <section className="DeviceFilter__section">
                <h6 className="DeviceFilter__sectionHeader">Selected Devices</h6>
            </section>
            <section className="DeviceFilter__section">
                <h6 className="DeviceFilter__sectionHeader">Type</h6>
            </section>
            <section className="DeviceFilter__section">
                <h6 className="DeviceFilter__sectionHeader">Platform</h6>
                <ul className="DeviceFilter__sectionList">
                    {platforms?.map((platform: string) => {
                        return <li className="DeviceFilter__sectionListItem">{platform}</li>;
                    })}
                </ul>
            </section>
            <section className="DeviceFilter__section">
                <h6 className="DeviceFilter__sectionHeader">Make</h6>
                <ul className="DeviceFilter__sectionList">
                    {makes?.map((make: string) => {
                        return <li className="DeviceFilter__sectionListItem">{make}</li>;
                    })}
                </ul>
            </section>
        </div>
    );
};

export default React.memo(DeviceFilter);
