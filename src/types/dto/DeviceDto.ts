import { Make } from '../Make';
import { DeviceType } from '../domain/Device';
import Platform from '../Platform';

export interface DeviceDTO {
    name: string;
    type: DeviceType;
    make: Make;
    platform: Platform;
    width: number;
    height: number;
    physical_size_inch: number;
    physical_size_cm: number;
    device_width: number;
    px_per_in: number;
    pixel_ratio: number;
}
