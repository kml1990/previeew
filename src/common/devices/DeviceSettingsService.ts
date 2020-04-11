import { injectable } from 'inversify';
import { Orientation } from '../../types/Orientation';

export interface DeviceSize {
    height: number;
    width: number;
}

const ZOOM_PERCENTAGE_TO_TENTHS = 100;

@injectable()
export default class DeviceSettingsService {
    static getSize(size: number, pixelRatio: number): number {
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

    private getZoomScale(zoom: number): number {
        return zoom / ZOOM_PERCENTAGE_TO_TENTHS;
    }
}
