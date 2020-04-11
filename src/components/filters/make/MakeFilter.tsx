import React, { useState, useEffect } from 'react';
import FilterSection from '../section/FilterSection';
import Button, { ButtonVariant, ButtonType } from '../../common/button/Button';
import { useInjection } from '../../../common/di/DependencyContext';
import DeviceService from '../../../common/devices/DeviceService';

import './MakeFilter.scss';

export interface MakeFilterProps {
    className?: string;
}

const MakeFilter: React.FC<MakeFilterProps> = ({ className = '' }) => {
    const deviceService = useInjection(DeviceService);
    const [makes, setMakes] = useState<string[]>();

    useEffect(() => {
        setMakes(deviceService.getMakes());
    }, []);

    return (
        <FilterSection className={`MakeFilter ${className}`} name="Filter by make" helper="">
            <ul className="MakeFilter__list">
                {makes?.map((make: string) => {
                    return (
                        <li key={make} className="MakeFilter__listItem">
                            <Button
                                text={make}
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

export default React.memo(MakeFilter);
