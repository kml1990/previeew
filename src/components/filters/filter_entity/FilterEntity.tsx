import React, { useState, useEffect, useCallback } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import FilterSection from '../section/FilterSection';
import Button, { ButtonVariant, ButtonType } from '../../common/button/Button';
import { useInjection } from '../../../common/di/DependencyContext';
import DeviceService from '../../../common/devices/DeviceService';
import { useFilter } from '../../common/context/FilterContext';
import { Filterable } from '../../../common/filter/FilterService';

import './FilterEntity.scss';
import { tagProperty } from 'inversify/dts/annotation/decorator_utils';

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
    }, []);

    const onClick = (filter: string) => {
        addFilter(property, filter);
    };

    // const onClick = useCallback((type: string) => {
    //     addFilter(property, type);
    // }, []);

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
