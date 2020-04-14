import { useLayoutEffect, useState } from 'react';

const useBackdrop = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useLayoutEffect(() => {
        if (isVisible) {
            document.body.classList.add('Body--withBackdrop');
        } else {
            document.body.classList.remove('Body--withBackdrop');
        }
    }, [isVisible]);

    const toggleBackdrop = () => {
        setIsVisible(!isVisible);
    };

    return [toggleBackdrop];
};

export default useBackdrop;
