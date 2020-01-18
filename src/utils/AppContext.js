import ContextFactory from 'utils/ContextFactory';

const initialState = {
    imagesRequested: 0,
    imagesLoaded: 0,
};
const AppContext = ContextFactory(initialState);

export default AppContext;
