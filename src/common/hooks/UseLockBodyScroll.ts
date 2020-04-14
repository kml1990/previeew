import { useLayoutEffect, useState } from 'react';

const useLockBodyScroll = () => {
    const [isLocked, toggleLock] = useState<boolean>(false);

    useLayoutEffect(() => {
        if (isLocked) {
            document.body.style.overflowY = 'hidden';
            return;
        }
        document.body.style.overflowY = 'scroll';
    }, [isLocked]);

    const toggleScrollLock = (scrollable: boolean) => {
        toggleLock(scrollable);
    };

    return [toggleScrollLock];
};

export default useLockBodyScroll;
