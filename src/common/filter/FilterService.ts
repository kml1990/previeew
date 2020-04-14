import _ from 'lodash';
import { injectable } from 'inversify';
import Device from '../../types/domain/Device';

export enum Filterable {
    TYPE = 'type',
    PLATFORM = 'platform',
    MAKE = 'make',
}

export type Filters = Map<Filterable, string[]>;
export type Query = { [key: string]: string[] };

@injectable()
export default class FilterService {
    addNewFilterType = (filters: Filters, filterName: Filterable, filter: string): Filters => {
        const filtersCopy = _.cloneDeep(filters);
        filtersCopy.set(filterName, [filter]);
        return filtersCopy;
    };

    updateFilterType = (filters: Filters, filterName: Filterable, filter: string): Filters => {
        const filterValues = filters.get(filterName) as string[];

        if (!filterValues.includes(filter)) {
            return this.updateFilterTypeWithNewFilter(filters, filterName, filter);
        }

        return this.removeFilterFromFilterType(filters, filterName, filter);
    };

    filterDevices = (devices: Device[], filter: Filters) => {
        const query = this.buildQuery(filter);
        const filteredDevices = devices.filter((device: Device) => {
            return this.checkDeviceAgainstFilter(device, query);
        });
        return filteredDevices;
    };

    private checkDeviceAgainstFilter = (device: Device, query: Query): boolean => {
        const deviceAsObject = device.getAsObject();
        return Object.keys(query).every((key: string) => {
            if (_.isUndefined(deviceAsObject[key])) {
                return false;
            }
            if (!query[key].includes(deviceAsObject[key])) {
                return false;
            }
            return true;
        });
    };

    private removeFilterFromFilterType = (
        filters: Filters,
        filterName: Filterable,
        filter: string,
    ): Filters => {
        const filtersCopy = _.cloneDeep(filters);
        const filterValues = filtersCopy.get(filterName) as string[];
        const filterIndex = filterValues.indexOf(filter);

        filterValues.splice(filterIndex, 1);
        if (filterValues.length === 0) {
            return this.removeEmptyFilterType(filtersCopy, filterName);
        }
        return filtersCopy.set(filterName, [...filterValues]);
    };

    private updateFilterTypeWithNewFilter = (
        filters: Filters,
        filterName: Filterable,
        filter: string,
    ): Filters => {
        const filtersCopy = _.cloneDeep(filters);
        const filterValues = filtersCopy.get(filterName) as string[];

        filtersCopy.set(filterName, [...filterValues, filter]);
        return filtersCopy;
    };

    private removeEmptyFilterType = (filters: Filters, filterName: Filterable): Filters => {
        const filtersCopy = _.cloneDeep(filters);
        filtersCopy.delete(filterName);
        return filtersCopy;
    };

    private buildQuery = (filters: Filters): Query => {
        const query: Query = {};
        filters.forEach((value: string[], key: Filterable) => {
            query[key] = value;
        });
        return query;
    };
}
