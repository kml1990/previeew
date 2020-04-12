import _ from 'lodash';
import { Filters } from '../../components/common/context/FilterContext';
import { Filterable } from './FilterService';
import Device from '../../types/domain/Device';

export type Query = { [key: string]: string[] };

export default class Filter {
    static buildQuery = (filters: Filters): Query => {
        const query: any = {};
        filters.forEach((value: string[], key: Filterable) => {
            query[key] = value;
        });
        return query;
    };

    static filterDevices = (devices: Device[], query: Query) => {
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
}
