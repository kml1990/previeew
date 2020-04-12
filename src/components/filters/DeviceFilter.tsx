import React from 'react';
import { Filterable } from '../../common/filter/FilterService';
import SelectedDevices from './selected_devices/SelectedDevices';
import FilterEntity from './filter_entity/FilterEntity';

export interface DeviceFilterProps {
    className?: string;
}

const DeviceFilter: React.FC<DeviceFilterProps> = ({ className = '' }) => {
    return (
        <div className={`DeviceFilter ${className}`}>
            <SelectedDevices />
            <FilterEntity property={Filterable.TYPE} />
            <FilterEntity property={Filterable.PLATFORM} />
            <FilterEntity property={Filterable.MAKE} />
        </div>
    );
};

export default React.memo(DeviceFilter);
