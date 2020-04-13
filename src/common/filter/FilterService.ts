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

    addFilter = (filters: Filters, filterName: Filterable, filter: string): Filters => {
        const filtersCopy = _.cloneDeep(filters);
        filtersCopy.set(filterName, [filter]);
        return filtersCopy;
    };

    updateFilter = (filters: Filters, filterName: Filterable, filter: string): Filters => {
        // TODO needs improvement
        const filtersCopy = _.cloneDeep(filters);
        const filterValues = filtersCopy.get(filterName);
        if (!filterValues) {
            return filtersCopy;
        }
        if (!filterValues.includes(filter)) {
            return filtersCopy.set(filterName, [...filterValues, filter]);
        } else {
            const filterIndex = filterValues.indexOf(filter);
            filterValues.splice(filterIndex, 1);
            if (filterValues.length === 0) {
                return this.removeEmptyFilter(filtersCopy, filterName);
            }
            return filtersCopy.set(filterName, [...filterValues]);
        }
    };

    private removeEmptyFilter = (filters: Filters, filterName: Filterable): Filters => {
        const filtersCopy = _.cloneDeep(filters);
        filtersCopy.delete(filterName);
        return filtersCopy;
    };

    filterDevices = (devices: Device[], filter: Filters) => {
        const query = this.buildQuery(filter);
        const filteredDevices = devices.filter((device: Device) => {
            const deviceAsObject = device.getAsObject();
            for (let key in query) {
                if (_.isUndefined(deviceAsObject[key])) {
                    return false;
                }
                if (!query[key].includes(deviceAsObject[key])) {
                    return false;
                }
            };
            return true;
        });
        return filteredDevices;
    };

    private buildQuery = (filters: Filters): Query => {
        const query: any = {};
        filters.forEach((value: string[], key: Filterable) => {
            query[key] = value;
        });
        return query;
    };
}