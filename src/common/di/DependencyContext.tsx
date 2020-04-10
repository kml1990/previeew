import React, { createContext, useContext } from 'react';
import { Container, interfaces } from 'inversify';

const DependencyContext = createContext<Container | null>(null);

interface DependenciesProps {
    container: Container;
}

export const DependencyProvider: React.FC<DependenciesProps> = ({ children, container }) => {
    return <DependencyContext.Provider value={container}>{children}</DependencyContext.Provider>;
};

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>) {
    const container = useContext(DependencyContext);
    if (container === null) {
        throw new Error(`The dependency container should be defined`);
    }
    return container.get<T>(identifier);
}