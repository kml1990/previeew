import React from 'react';
import dependenciesContainer from '../../../common/di/DependencyContainer';
import { DependencyProvider } from '../../../common/di/DependencyContext';
import FilterProvider from './FilterContext';

const ContextProvider: React.FC = ({ children }) => {
    return (
        <DependencyProvider container={dependenciesContainer}>
            <FilterProvider>{children}</FilterProvider>
        </DependencyProvider>
    );
};

export default ContextProvider;
