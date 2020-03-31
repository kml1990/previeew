import { injectable } from 'inversify';
import Device from '../domain/Device';
import { Unmarshaller } from './Unmarshalling';
import { DeviceDTO } from '../dto/DeviceDto';

@injectable()
export default class DeviceUnmarshaller implements Unmarshaller<DeviceDTO, Device> {
    unmarshal(deviceDto: DeviceDTO): Device {
        const {
            name,
            type,
            make,
            os,
            width,
            height,
            physical_size_inch,
            physical_size_cm,
            device_width,
            px_per_in,
        } = deviceDto;

        return new Device({
            name,
            type,
            make,
            os,
            width,
            height,
            physicalSizeInInch: physical_size_inch,
            physicalSizeInCm: physical_size_cm,
            deviceWidth: device_width,
            pixelsPerInch: px_per_in,
        });
    }
}
