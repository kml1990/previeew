import React, { createContext, useState, useContext, useEffect } from 'react';
import { useInjection } from '../../../common/di/DependencyContext';
import Device from '../../../types/domain/Device';
import DeviceService from '../../../common/devices/DeviceService';

export interface FilterContextProps {
    filteredDevices: Device[];
    selectedDevices: Device[];
}

export const FilterContext = createContext<FilterContextProps>({} as FilterContextProps);

const FilterProvider: React.FC = ({ children }) => {
    const deviceService = useInjection(DeviceService);
    const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
    const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

    useEffect(() => {
        const allDevices = deviceService.getAllDevices();
        setFilteredDevices(allDevices);
        setSelectedDevices(deviceService.getSelectedDevices());
    }, []);

    const filterProviderValues = {
        filteredDevices,
        selectedDevices,
    };

    return <FilterContext.Provider value={filterProviderValues}>{children}</FilterContext.Provider>;
};

export function useFilter(): FilterContextProps {
    return useContext(FilterContext);
}

export default FilterProvider;
