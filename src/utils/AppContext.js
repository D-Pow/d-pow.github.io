import ContextFactory from 'utils/ContextFactory';

export const AppContextFields = {
    IMAGES_REQUESTED: 'imagesRequested',
    IMAGES_LOADED: 'imagesLoaded'
};

const initialState = {
    [AppContextFields.IMAGES_REQUESTED]: 0,
    [AppContextFields.IMAGES_LOADED]: 0
};

const AppContext = ContextFactory(initialState);

export default AppContext;
