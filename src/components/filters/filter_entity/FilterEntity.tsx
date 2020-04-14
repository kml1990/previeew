import React, { useState, useEffect } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import DeviceService from '../../../common/devices/DeviceService';
import { useInjection } from '../../../common/di/DependencyContext';
import FilterSection from '../section/FilterSection';
import Button, { ButtonVariant, ButtonType } from '../../common/button/Button';
import { useFilter } from '../../common/context/FilterContext';
import { Filterable } from '../../../common/filter/FilterService';

import './FilterEntity.scss';

export interface FilterEntityProps {
    property: Filterable;
    className?: string;
}

const FilterEntity: React.FC<FilterEntityProps> = ({ property, className = '' }) => {
    const deviceService = useInjection(DeviceService);
    const { filters, addFilter } = useFilter();
    const [entity, setEntity] = useState<string[]>();

    useEffect(() => {
        setEntity(deviceService.getEntity(property));
    }, [deviceService, property]);

    const onClick = (filter: string) => {
        addFilter(property, filter);
    };

    const isSelected = (filter: string) => {
        const filterProperty = filters.get(property);
        if (!filterProperty) {
            return false;
        }
        return filterProperty.includes(filter);
    };

    return (
        <FilterSection
            className={`FilterEntity ${className}`}
            name={`Filter by ${property}`}
            helper=""
        >
            <ul className="FilterEntity__list">
                {entity?.map((entityItem: string) => {
                    const isFilterSelected = isSelected(entityItem);
                    const selectedClass = isFilterSelected
                        ? 'FilterEntity__listItem--selected'
                        : '';
                    const additionalProps = isFilterSelected ? { icon: faCheck } : {};
                    return (
                        <li key={entityItem} className={`FilterEntity__listItem ${selectedClass}`}>
                            <Button
                                text={entityItem}
                                variant={ButtonVariant.SECONDARY}
                                type={ButtonType.BUTTON}
                                className="FilterEntity__button"
                                onClick={() => onClick(entityItem)}
                                {...additionalProps}
                            />
                        </li>
                    );
                })}
            </ul>
        </FilterSection>
    );
};

export default React.memo(FilterEntity);
