import { Make } from '../Make';
import OS from '../OS';

export enum DeviceType {
    PHONE = 'phone',
    TABLET = 'tablet',
    MONITOR = 'monitor',
}

export interface DeviceData {
    name: string;
    type: DeviceType;
    make: Make;
    os: OS;
    width: number;
    height: number;
    physicalSizeInInch: number;
    physicalSizeInCm: number;
    deviceWidth: number;
    pixelsPerInch: number;
    pixelRatio: number;
}

export default class Device {
    private readonly _name: string;

    private readonly _type: DeviceType;

    private readonly _make: Make;

    private readonly _os: OS;

    private readonly _width: number;

    private readonly _height: number;

    private readonly _physicalSizeInInch: number;

    private readonly _physicalSizeInCm: number;

    private readonly _deviceWidth: number;

    private readonly _pixelsPerInch: number;

    private readonly _pixelRatio: number;

    constructor(deviceData: DeviceData) {
        const {
            name,
            type,
            make,
            os,
            width,
            height,
            physicalSizeInInch,
            physicalSizeInCm,
            deviceWidth,
            pixelsPerInch,
            pixelRatio,
        } = deviceData;

        this._name = name;
        this._type = type;
        this._make = make;
        this._os = os;
        this._width = width;
        this._height = height;
        this._physicalSizeInInch = physicalSizeInInch;
        this._physicalSizeInCm = physicalSizeInCm;
        this._deviceWidth = deviceWidth;
        this._pixelsPerInch = pixelsPerInch;
        this._pixelRatio = pixelRatio;
    }

    get name(): string {
        return this._name;
    }

    get type(): DeviceType {
        return this._type;
    }

    get make(): Make {
        return this._make;
    }

    get os(): OS {
        return this._os;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get physicalSizeInInch(): number {
        return this._physicalSizeInInch;
    }

    get physicalSizeInCm(): number {
        return this._physicalSizeInCm;
    }

    get deviceWidth(): number {
        return this._deviceWidth;
    }

    get pixelsPerInch(): number {
        return this._pixelsPerInch;
    }

    get pixelRatio(): number {
        return this._pixelRatio;
    }
}
