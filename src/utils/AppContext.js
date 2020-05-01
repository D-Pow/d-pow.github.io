import ContextFactory from 'utils/ContextFactory';

export const AppContextFields = {
    IMAGES_REQUESTED: 'imagesRequested',
    IMAGES_LOADED: 'imagesLoaded',
    GET_IMAGES_HAVE_BEEN_REQUESTED: 'getImagesHaveBeenRequested',
    GET_IMAGES_STILL_LOADING: 'getImagesStillLoading',
    GET_IMAGES_FINISHED_LOADING: 'getImagesFinishedLoading',
    GLOBAL_SPINNER_CLOSED: 'globalSpinnerClosed',
    GLOBAL_SPINNER_UNMOUNTED: 'globalSpinnerUnmounted'
};

/**
 * Note: To use the getter functions, the functions cannot be spread
 * out from the `contextState` object, e.g.
 * `const { contextState: { getImagesStillLoading }} = useContext(AppContext.context);`
 *
 * This is because the value of `this` is attached to whatever the calling object is,
 * and spreading the function out from the `contextState` would make `this` the value
 * of the parent component.
 * Thus, use like e.g.
 * `const { contextState } = useContext(AppContext.context); contextState.getImagesStillLoading();`
 *
 */
const initialState = {
    [AppContextFields.IMAGES_REQUESTED]: 0,
    [AppContextFields.IMAGES_LOADED]: 0,
    [AppContextFields.GET_IMAGES_HAVE_BEEN_REQUESTED]: function() {
        return this[AppContextFields.IMAGES_REQUESTED] > 0;
    },
    [AppContextFields.GET_IMAGES_FINISHED_LOADING]: function() {
        return this[AppContextFields.IMAGES_LOADED] === this[AppContextFields.IMAGES_REQUESTED];
    },
    [AppContextFields.GET_IMAGES_STILL_LOADING]: function() {
        const haventBeenRequestedYet = !this[AppContextFields.GET_IMAGES_HAVE_BEEN_REQUESTED]();
        const haventFinishedLoading = !this[AppContextFields.GET_IMAGES_FINISHED_LOADING]();

        return haventBeenRequestedYet || haventFinishedLoading;
    },
    [AppContextFields.GLOBAL_SPINNER_CLOSED]: false,
    [AppContextFields.GLOBAL_SPINNER_UNMOUNTED]: false
};

const AppContext = ContextFactory(initialState);

export default AppContext;
