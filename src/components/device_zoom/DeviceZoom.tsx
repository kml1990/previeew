import React, { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';
import { useDeviceSettings } from '../device_settings/SettingsContext';

import './DeviceZoom.scss';

export interface DeviceZoomProps {
    className?: string;
}

export const DEFAULT_RADIX = 10;
export const ZOOM_MIN = 30;
export const ZOOM_MAX = 100;
export const ZOOM_STEP = 1;
export const DEFAULT_DEVICE_ZOOM = 60;

const DeviceZoom: React.FC<DeviceZoomProps> = ({ className }) => {
    const { zoom, setZoom } = useDeviceSettings();

    const onZoomChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newZoom = parseInt(event.target.value, DEFAULT_RADIX);
        setZoom(newZoom);
    };

    return (
        <div className={`DeviceZoom ${className}`}>
            <Form.Group className="DeviceZoom__formGroup">
                <Form.Label>{`${zoom}%`}</Form.Label>
                <Form.Control
                    className="DeviceZoom__input"
                    type="range"
                    onChange={onZoomChange}
                    defaultValue={zoom}
                    min={ZOOM_MIN}
                    max={ZOOM_MAX}
                    step={ZOOM_STEP}
                    custom
                />
            </Form.Group>
        </div>
    );
};

export default React.memo(DeviceZoom);
