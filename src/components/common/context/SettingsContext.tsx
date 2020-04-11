import React, { createContext, useState, useContext } from 'react';
import { Orientation } from '../../../types/Orientation';
import { DEFAULT_DEVICE_ZOOM } from '../../settings/device_zoom/DeviceZoom';
import { DEFAULT_DEVICE_ORIENTATION } from '../../settings/device_orientation/DeviceOrientation';
import { DEFAULT_SEARCH_URL } from '../../settings/url_search/UrlSearch';

export type SetUrlCallback = (url: string) => void;
export type SetZoomCallback = (zoom: number) => void;
export type SetOrientationCallback = (orientation: Orientation) => void;

export interface SettingsContextProps {
    url: string;
    setUrl: SetUrlCallback;
    zoom: number;
    setZoom: SetZoomCallback;
    orientation: Orientation;
    setOrientation: SetOrientationCallback;
}

export const SettingsContext = createContext<SettingsContextProps>({} as SettingsContextProps);

const SettingsProvider: React.FC = ({ children }) => {
    const [searchUrl, setSearchUrl] = useState<string>(DEFAULT_SEARCH_URL);
    const [deviceZoom, setDeviceZoom] = useState<number>(DEFAULT_DEVICE_ZOOM);
    const [deviceOrientation, setDeviceOrientation] = useState<Orientation>(
        DEFAULT_DEVICE_ORIENTATION,
    );

    const setUrl = (url: string) => {
        setSearchUrl(url);
    };

    const setZoom = (zoom: number) => {
        setDeviceZoom(zoom);
    };

    const setOrientation = (orientation: Orientation) => {
        setDeviceOrientation(orientation);
    };

    const SettingsProviderValues = {
        url: searchUrl,
        zoom: deviceZoom,
        orientation: deviceOrientation,
        setUrl,
        setZoom,
        setOrientation,
    };

    return (
        <SettingsContext.Provider value={SettingsProviderValues}>
            {children}
        </SettingsContext.Provider>
    );
};

export function useSettings(): SettingsContextProps {
    return useContext(SettingsContext);
}

export default SettingsProvider;
