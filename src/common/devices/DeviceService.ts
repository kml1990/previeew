import { injectable } from 'inversify';
import DeviceDTOs from './Devices.json';
import DeviceUnmarshaller from '../../types/marshalling/DeviceUnmarshaller';
import dependenciesContainer from '../di/DependencyContainer';
import { DeviceDTO } from '../../types/dto/DeviceDto';
import Device from '../../types/domain/Device';
import { Orientation } from '../../types/Orientation';

export interface DeviceSize {
    height: number;
    width: number;
}

export type DeviceMap = Map<string, Device>;

const DEFAULT_SELECTED_DEVICES = [
    'Apple iPhone X',
    'Apple iPhone 6',
    'Apple iPhone 8',
    'Samsung Galaxy S8',
    'Google Pixel XL',
    // 'Apple iPad Pro',
    // 'Apple iPad Air',
    // 'Dell XPS 13',
    // 'Apple MacBook Pro 13-inch',
    // 'Dell U2713HM 27',
];

const ZOOM_PERCENTAGE_TO_TENTHS = 100;

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

    getSelectedDevices(): Device[] {
        if (this._selectedDevices.size === 0) {
            const selectedDevices = this.getDefaultSelectedDevices();
            return Array.from(selectedDevices);
        }
        return Array.from(this._selectedDevices);
    }

    getPlatforms(): string[] {
        return Array.from(this._devicePlatforms);
    }

    getMakes(): string[] {
        return Array.from(this._deviceMakes);
    }

    getSize(size: number, pixelRatio: number): number {
        return size / pixelRatio;
    }

    getSizeBasedOnSettings(
        height: number,
        width: number,
        orientation: Orientation,
        zoom: number,
    ): DeviceSize {
        if (orientation === Orientation.LANDSCAPE) {
            return {
                height: width * this.getZoomScale(zoom),
                width: height * this.getZoomScale(zoom),
            };
        }
        return {
            height: height * this.getZoomScale(zoom),
            width: width * this.getZoomScale(zoom),
        };
    }

    // TODO move to device settings service

    private getZoomScale(zoom: number): number {
        return zoom / ZOOM_PERCENTAGE_TO_TENTHS;
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
        const { os, make } = device;
        if (os) {
            this._devicePlatforms.add(os);
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
