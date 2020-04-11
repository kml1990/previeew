import { injectable } from 'inversify';
import dependenciesContainer from '../di/DependencyContainer';
import Device from '../../types/domain/Device';
import DeviceService from './DeviceService';

@injectable()
export default class DeviceFilterService {
    private readonly deviceService: DeviceService;

    constructor() {
        this.deviceService = dependenciesContainer.get(DeviceService);
    }

    getFilteredDevices(): string[] {
        return this.deviceService.getAllDevices().map((device: Device) => device.name);
    }
}
