import { DeviceType } from '../Device';
import { Make } from '../Make';
import OS from '../OS';

export interface DeviceDTO {
    name: string;
    type: DeviceType;
    make: Make;
    os: OS;
    width: number;
    height: number;
    physical_size_inch: number;
    physical_size_cm: number;
    device_width: number;
    px_per_in: number;
    pixel_ratio: number;
}
