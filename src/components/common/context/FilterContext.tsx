import React, { createContext, useState, useContext, useEffect } from 'react';
import _ from 'lodash';
import DeviceService from '../../../common/devices/DeviceService';
import { useInjection } from '../../../common/di/DependencyContext';
import Device from '../../../types/domain/Device';
import FilterService, { Filterable, Filters } from '../../../common/filter/FilterService';

export type AddFilterCallaback = (filterName: Filterable, filter: string) => void;
export type UpdateSelectedDevicesCallaback = (selected: string[]) => void;

export interface FilterContextProps {
    filteredDevices: Device[];
    selectedDevices: Device[];
    filters: Filters;
    addFilter: AddFilterCallaback;
    updateSelectedDevices: UpdateSelectedDevicesCallaback;
}

export const FilterContext = createContext<FilterContextProps>({} as FilterContextProps);

const FilterProvider: React.FC = ({ children }) => {
    const deviceService = useInjection(DeviceService);
    const filterService = useInjection(FilterService);

    const [filters, setFilters] = useState<Filters>(new Map());
    const [devices, setDevices] = useState<Device[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
    const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

    useEffect(() => {
        const allDevices = deviceService.getAllDevices();
        setDevices(allDevices);
        setFilteredDevices(allDevices);
        setSelectedDevices(deviceService.getSelectedDevices());
    }, []);

    const applyFilters = () => {
        if (filters.size === 0) {
            return;
        }

        setFilteredDevices(filterService.filterDevices(devices, filters));
    };

    useEffect(() => {
        applyFilters();
    }, [filters]);

    const addFilter = (filterName: Filterable, filter: string) => {
        if (!filters.has(filterName)) {
            setFilters(filterService.addFilter(filters, filterName, filter));
            return;
        }
        setFilters(filterService.updateFilter(filters, filterName, filter));
    };

    const updateSelectedDevices = (selectedOptions: string[]) => {
        const selected = devices.filter((device: Device) => {
            return selectedOptions.includes(device.name);
        });
        setSelectedDevices(selected);
    };

    const filterProviderValues = {
        filteredDevices,
        selectedDevices,
        filters,
        addFilter,
        updateSelectedDevices,
    };

    return <FilterContext.Provider value={filterProviderValues}>{children}</FilterContext.Provider>;
};

export function useFilter(): FilterContextProps {
    return useContext(FilterContext);
}

export default FilterProvider;
