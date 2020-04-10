import React, { createContext, useState, useContext } from 'react';
import Backdrop from './Backdrop';

export interface BackdropContextProps {
    isBackdropVisible: boolean;
    toggleBackdropVisibility: () => void;
}

export const BackdropContext = createContext<BackdropContextProps>({} as BackdropContextProps);

const BackdropProvider: React.FC = ({ children }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleBackdropVisibility = () => {
        setIsVisible(!isVisible);
    };

    const BackdropProviderValues = {
        isBackdropVisible: isVisible,
        toggleBackdropVisibility,
    };

    return (
        <BackdropContext.Provider value={BackdropProviderValues}>
            <Backdrop />
            {children}
        </BackdropContext.Provider>
    );
};

export function useBackdrop(): BackdropContextProps {
    return useContext(BackdropContext);
}

export default BackdropProvider;