import { injectable } from 'inversify';
import DeviceDTOs from './Devices.json';
import DeviceUnmarshaller from '../../types/marshalling/DeviceUnmarshaller';
import dependenciesContainer from '../di/DependencyContainer';
import { DeviceDTO } from '../../types/dto/DeviceDto';
import Device, { DeviceType } from '../../types/domain/Device';
import StringUtil from '../../utils/string/StringUtil';
import { Filterable } from '../filter/FilterService';

export type DeviceMap = Map<string, Device>;

const DEFAULT_SELECTED_DEVICES = [
    'Apple iPhone X',
    'Apple iPhone 6',
    'Apple iPhone 8',
    'Samsung Galaxy S8',
    'Google Pixel XL',
];

@injectable()
export default class DeviceService {
    private _devices: DeviceMap;

    private _selectedDevices: Set<Device>;

    private _devicePlatforms: Set<string>;

    private _deviceMakes: Set<string>;

    private readonly _deviceUnmarshaller: DeviceUnmarshaller;

    constructor() {
        this._devices = new Map();
        this._selectedDevices = new Set();
        this._devicePlatforms = new Set();
        this._deviceMakes = new Set();

        this._deviceUnmarshaller = dependenciesContainer.get(DeviceUnmarshaller);
    }

    getAllDevices(): Device[] {
        if (this._devices.size === 0) {
            this._devices = this.loadAllDevices();
        }
        return Array.from(this._devices.values());
    }

    getSelectedDevices(): Device[] {
        if (this._selectedDevices.size === 0) {
            const selectedDevices = this.getDefaultSelectedDevices();
            return Array.from(selectedDevices);
        }
        return Array.from(this._selectedDevices);
    }

    getTypes(): string[] {
        return Object.values(DeviceType).map((deviceType: string) =>
            StringUtil.capitalize(deviceType),
        );
    }

    getPlatforms(): string[] {
        return Array.from(this._devicePlatforms);
    }

    getMakes(): string[] {
        return Array.from(this._deviceMakes);
    }

    getEntity(property: Filterable): string[] {
        switch (property) {
            case Filterable.TYPE: {
                return this.getTypes();
            }
            case Filterable.PLATFORM: {
                return this.getPlatforms();
            }
            case Filterable.MAKE: {
                return this.getMakes();
            }
            default: {
                return [];
            }
        }
    }

    private getDefaultSelectedDevices(): Set<Device> {
        if (this._devices.size === 0) {
            this._devices = this.loadAllDevices();
        }
        return DEFAULT_SELECTED_DEVICES.reduce((testing: Set<Device>, name: string) => {
            const device = this._devices.get(name);
            if (device) {
                testing.add(device);
            }
            return testing;
        }, new Set());
    }

    private addFilters(device: Device) {
        const { platform, make } = device;
        if (platform) {
            this._devicePlatforms.add(platform);
        }
        if (make) {
            this._deviceMakes.add(make);
        }
    }

    private loadAllDevices(): DeviceMap {
        const devices = DeviceDTOs as DeviceDTO[];
        return devices.reduce((deviceMap: DeviceMap, deviceDto: DeviceDTO) => {
            const device = this._deviceUnmarshaller.unmarshal(deviceDto);
            this.addFilters(device);
            deviceMap.set(device.name, device);
            return deviceMap;
        }, new Map());
    }
}
