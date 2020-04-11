import React, { useState, useEffect } from 'react';
import FilterSection from '../section/FilterSection';
import Button, { ButtonVariant, ButtonType } from '../../common/button/Button';
import { useInjection } from '../../../common/di/DependencyContext';
import DeviceService from '../../../common/devices/DeviceService';

import './PlatformFilter.scss';

export interface PlatformFilterProps {
    className?: string;
}

const PlatformFilter: React.FC<PlatformFilterProps> = ({ className = '' }) => {
    const deviceService = useInjection(DeviceService);
    const [platforms, setPlatforms] = useState<string[]>();

    useEffect(() => {
        setPlatforms(deviceService.getPlatforms());
    }, []);

    return (
        <FilterSection
            className={`PlatformFilter ${className}`}
            name="Filter by platform"
            helper=""
        >
            <ul className="PlatformFilter__list">
                {platforms?.map((platform: string) => {
                    return (
                        <li key={platform} className="PlatformFilter__listItem">
                            <Button
                                text={platform}
                                variant={ButtonVariant.SECONDARY}
                                type={ButtonType.BUTTON}
                                className="DeviceFilter__button"
                            />
                        </li>
                    );
                })}
            </ul>
        </FilterSection>
    );
};

export default React.memo(PlatformFilter);
