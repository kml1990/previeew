import React, { ReactElement } from 'react';

export interface FilterSectionProps {
    name: string;
    helper?: string;
    className?: string;
    children: ReactElement;
}

const FilterSection: React.FC<FilterSectionProps> = ({ name, helper, className, children }) => {
    return (
        <section className={`FilterSection ${className}`}>
            <h6>{name}</h6>
            {helper && <p>{helper}</p>}
            <div>{children}</div>
        </section>
    );
};

export default React.memo(FilterSection);
