import React from 'react';
import { useBackdrop } from './BackdropContext';

import './Backdrop.scss';

const Backdrop: React.FC = () => {
    const { isBackdropVisible } = useBackdrop();

    const visibilityClass = isBackdropVisible ? 'Backdrop--visible' : 'Backdrop--hidden';

    return <div className={`Backdrop ${visibilityClass}`} />;
};

export default React.memo(Backdrop);
