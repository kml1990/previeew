import React, { useState, useEffect } from 'react';
import FilterSection from '../section/FilterSection';
import Button, { ButtonVariant, ButtonType } from '../../common/button/Button';
import { useInjection } from '../../../common/di/DependencyContext';
import DeviceService from '../../../common/devices/DeviceService';

import './TypeFilter.scss';

export interface TypeFilterProps {
    className?: string;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ className = '' }) => {
    const deviceService = useInjection(DeviceService);
    const [types, setTypes] = useState<string[]>();

    useEffect(() => {
        setTypes(deviceService.getTypes());
    }, []);

    return (
        <FilterSection className={`TypeFilter ${className}`} name="Filter by type" helper="">
            <ul className="TypeFilter__list">
                {types?.map((type: string) => {
                    return (
                        <li key={type} className="TypeFilter__listItem">
                            <Button
                                text={type}
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

export default React.memo(TypeFilter);
