import React, { useContext } from 'react';
import App from './App';
import AppContext, { AppContextFields } from 'utils/AppContext';

function AppProvider() {
    const { contextState, setContextState } = useContext(AppContext.Context);
    const imagesStillLoading = contextState[AppContextFields.GET_IMAGES_STILL_LOADING]();

    return (
        <App
            imagesStillLoading={imagesStillLoading}
            setContextState={setContextState}
        />
    );
}

export default AppProvider;
