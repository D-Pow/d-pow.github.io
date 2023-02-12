import { useContext } from 'react';

import AppContext, { AppContextFields } from '@/utils/AppContext';

import SplashSection from './SplashSection';

function SplashSectionProvider() {
    const { contextState } = useContext(AppContext.Context);
    const spinnerWasClosed = contextState[AppContextFields.GLOBAL_SPINNER_CLOSED];

    return <SplashSection spinnerWasClosed={spinnerWasClosed} />;
}

export default SplashSectionProvider;
