import React, { createContext, useState, useContext } from 'react';
import Backdrop from '../backdrop/Backdrop';

export type SetScrollPositionCallback = (position: number) => void;

export interface ScrollContextProps {
    scrollPosition: number;
    setScrollPosition: SetScrollPositionCallback;
}

export const ScrollContext = createContext<ScrollContextProps>({} as ScrollContextProps);

const ScrollProvider: React.FC = ({ children }) => {
    const [iframeScrollPosition, setIframeScrollPosition] = useState<number>(0);

    const setScrollPosition = (position: number) => {
        setIframeScrollPosition(position);
    };

    const ScrollProviderValues = {
        scrollPosition: iframeScrollPosition,
        setScrollPosition,
    };

    return (
        <ScrollContext.Provider value={ScrollProviderValues}>
            <Backdrop />
            {children}
        </ScrollContext.Provider>
    );
};

export function useScroll(): ScrollContextProps {
    return useContext(ScrollContext);
}

export default ScrollProvider;
