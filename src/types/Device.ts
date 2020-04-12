import { Make } from './Make';
import OS from './Platform';
import { DeviceType } from './domain/Device';

export interface Device {
    device: string;
    os: OS;
    physical_size_inch: number;
    physical_size_cm: number;
    physical_size: number;
    width: number;
    height: number;
    device_width: number;
    px_per_in: number;
    make: Make;
    type: DeviceType;
}
