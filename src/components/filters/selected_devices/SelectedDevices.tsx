import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useFilter } from '../../common/context/FilterContext';
import Device from '../../../types/domain/Device';
import FilterSection from '../section/FilterSection';

import './SelectedDevices.scss';

export interface DevicesAsSelectOptions {
    value: string;
    label: string;
}

export interface SelectedDevicesProps {
    className?: string;
}

const SelectedDevices: React.FC<SelectedDevicesProps> = ({ className = '' }) => {
    const filter = useFilter();
    const [filteredDevices, setFilteredDevices] = useState<DevicesAsSelectOptions[]>([]);
    const [selectedDevices, setSelectedDevices] = useState<DevicesAsSelectOptions[]>([]);

    const deviceAsOption = (device: Device) => {
        const { name } = device;
        const option = {
            value: name,
            label: name,
        };
        return option;
    };

    useEffect(() => {
        setFilteredDevices(
            filter.filteredDevices.map((device) => {
                return deviceAsOption(device);
            }),
        );
        setSelectedDevices(
            filter.selectedDevices.map((device) => {
                return deviceAsOption(device);
            }),
        );
    }, []);

    const handleChange = (selectedOption: any) => {
        console.log(selectedOption);
    };

    return (
        <FilterSection className={`SelectedDevices ${className}`} name="Selected Devices" helper="">
            <Select
                classNamePrefix="SelectedDevices"
                value={selectedDevices}
                onChange={handleChange}
                options={filteredDevices}
                isMulti
            />
        </FilterSection>
    );
};

export default React.memo(SelectedDevices);
