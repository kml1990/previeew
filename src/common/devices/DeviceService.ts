import { injectable } from 'inversify';
import DeviceDTOs from './Devices.json';
import DeviceUnmarshaller from '../../types/marshalling/DeviceUnmarshaller';
import dependenciesContainer from '../di/DependencyContainer';
import { DeviceDTO } from '../../types/dto/DeviceDto';
import Device from '../../types/domain/Device';

@injectable()
export default class DeviceService {
    private readonly _devices: Device[];

    private readonly _deviceUnmarshaller: DeviceUnmarshaller;

    constructor() {
        this._devices = [];
        this._deviceUnmarshaller = dependenciesContainer.get(DeviceUnmarshaller);
    }

    get devices(): Device[] {
        if (this._devices.length === 0) {
            return this.loadDevices();
        }
        return this._devices;
    }

    private loadDevices(): Device[] {
        const devices = DeviceDTOs as DeviceDTO[];
        return devices.map((device: DeviceDTO) => {
            return this._deviceUnmarshaller.unmarshal(device);
        });
    }
};