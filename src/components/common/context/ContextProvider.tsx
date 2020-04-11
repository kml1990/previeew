import React from 'react';
import dependenciesContainer from '../../../common/di/DependencyContainer';
import { DependencyProvider } from '../../../common/di/DependencyContext';
import FilterProvider from './FilterContext';
import BackdropProvider from './BackdropContext';

const ContextProvider: React.FC = ({ children }) => {
    return (
        <DependencyProvider container={dependenciesContainer}>
            <FilterProvider>
                <BackdropProvider>{children}</BackdropProvider>
            </FilterProvider>
        </DependencyProvider>
    );
};

export default ContextProvider;
