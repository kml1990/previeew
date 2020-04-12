import React, { createContext, useState, useContext, useEffect } from 'react';
import _ from 'lodash';
import DeviceService from '../../../common/devices/DeviceService';
import { useInjection } from '../../../common/di/DependencyContext';
import Device from '../../../types/domain/Device';
import { Filterable } from '../../../common/filter/FilterService';
import Filter from '../../../common/filter/Filter';

export type Filters = Map<Filterable, string[]>;
export type AddFilterCallaback = (filterProperty: Filterable, filter: string) => void;
export type UpdateSelectedCallaback = (selected: string[]) => void;

export interface FilterContextProps {
    filteredDevices: Device[];
    selectedDevices: Device[];
    filters: Filters;
    addFilter: AddFilterCallaback;
    updateSelected: UpdateSelectedCallaback;
}

export const FilterContext = createContext<FilterContextProps>({} as FilterContextProps);

const FilterProvider: React.FC = ({ children }) => {
    const deviceService = useInjection(DeviceService);
    const [filters, setFilters] = useState<Filters>(new Map());
    const [allDevices, setAllDevices] = useState<Device[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
    const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

    useEffect(() => {
        const devices = deviceService.getAllDevices();
        setAllDevices(devices);
        setFilteredDevices(devices);
        setSelectedDevices(deviceService.getSelectedDevices());
    }, []);

    console.log(allDevices)

    const applyFilters = () => {
        if (filters.size === 0) {
            return;
        }

        const query = Filter.buildQuery(filters);
        const filtered = Filter.filterDevices(allDevices, query);

        setFilteredDevices(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [filters]);

    const addNewFilter = (filterProperty: Filterable, filter: string) => {
        const filtersCopy = _.cloneDeep(filters);
        filtersCopy.set(filterProperty, [filter]);
        setFilters(filtersCopy);
    };

    // TODO - needs improving move to filter service
    const updateExistingFilter = (filterProperty: Filterable, filter: string) => {
        const filtersCopy = _.cloneDeep(filters);
        const filterValues = filtersCopy.get(filterProperty);
        if (filterValues) {
            if (!filterValues.includes(filter)) {
                filtersCopy.set(filterProperty, [...filterValues, filter]);
            } else {
                const filterIndex = filterValues.indexOf(filter);
                filterValues.splice(filterIndex, 1);
                if (filterValues.length !== 0) {
                    filtersCopy.set(filterProperty, [...filterValues]);
                } else {
                    filtersCopy.delete(filterProperty);
                }
            }
            setFilters(filtersCopy);
        }
    };

    const addFilter = (filterProperty: Filterable, filter: string) => {
        if (!filters.has(filterProperty)) {
            addNewFilter(filterProperty, filter);
            return;
        }
        updateExistingFilter(filterProperty, filter);
    };

    const updateSelected = (selectedOptions: string[]) => {
        const selected = allDevices.filter((device: Device) => {
            return selectedOptions.includes(device.name);
        });
        setSelectedDevices(selected);
    };

    const filterProviderValues = {
        filteredDevices,
        selectedDevices,
        filters,
        addFilter,
        updateSelected,
    };

    return <FilterContext.Provider value={filterProviderValues}>{children}</FilterContext.Provider>;
};

export function useFilter(): FilterContextProps {
    return useContext(FilterContext);
}

export default FilterProvider;
