import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useFilter } from '../../common/context/FilterContext';
import Device from '../../../types/domain/Device';
import FilterSection from '../section/FilterSection';

import './SelectedDevices.scss';

export interface DevicesAsSelectOption {
    value: string;
    label: string;
}

export interface SelectedDevicesProps {
    className?: string;
}

const SelectedDevices: React.FC<SelectedDevicesProps> = ({ className = '' }) => {
    const { filteredDevices, selectedDevices, updateSelectedDevices } = useFilter();
    const [filtered, setFiltered] = useState<DevicesAsSelectOption[]>([]);
    const [selected, setSelected] = useState<DevicesAsSelectOption[]>([]);

    const deviceAsOption = (devices: Device[]) => {
        return devices.map((device) => {
            const { name } = device;
            const option = {
                value: name,
                label: name,
            };
            return option;
        });
    };

    useEffect(() => {
        setFiltered(deviceAsOption(filteredDevices));
        setSelected(deviceAsOption(selectedDevices));
    }, [filteredDevices, selectedDevices]);

    const handleChange = (selectedOptions: any) => {
        setSelected(selectedOptions);
        updateSelectedDevices(selectedOptions.map((option: DevicesAsSelectOption) => option.label));
    };

    return (
        <FilterSection className={`SelectedDevices ${className}`} name="Selected Devices" helper="">
            <Select
                classNamePrefix="SelectedDevices"
                value={selected}
                onChange={handleChange}
                options={filtered}
                isMulti
            />
        </FilterSection>
    );
};

export default React.memo(SelectedDevices);
