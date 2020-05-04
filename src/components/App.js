import React, { useState, useEffect, useContext } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import SpinnerAtom from 'components/ui/SpinnerAtom';
import IncompatibleBrowserFallback from 'components/IncompatibleBrowserFallback';
import { isMicrosoftBrowser } from 'utils/BrowserIdentification';
import { scrollWindowToTop } from 'utils/Events';
import AppContext, { AppContextFields } from 'utils/AppContext';
import { useWindowResize } from 'utils/Hooks';

/**
 * Lazy-load components so the Spinner is prioritized, loaded quickly, and unblocked from animating.
 * This speeds up the initial page load for the user.
 *
 * Split import() and lazy() calls from each other so that component-loading is initiated immediately
 * instead of waiting to load until they are in view. This has the net effect of allowing the Spinner
 * to load first, but then loading the rest of the components as soon as the Spinner is rendered.
 * If the promise were nested inside the lazy() call instead, then e.g. the About component wouldn't
 * be loaded until the user traverses to /about.
 */

const homeImportPromise = import(/* webpackChunkName: 'Home' */ 'components/Home');
const Home = React.lazy(() => homeImportPromise);

const aboutImportPromise = import(/* webpackChunkName: 'About' */ 'components/About');
const About = React.lazy(() => aboutImportPromise);

const headerImportPromise = import(/* webpackChunkName: 'Header' */ 'components/Header');
const Header = React.lazy(() => headerImportPromise);

const footerImportPromise = import(/* webpackChunkName: 'Footer' */ 'components/Footer');
const Footer = React.lazy(() => footerImportPromise);

const routes = [
    {
        path: '/',
        component: Home,
        name: 'Home',
        exact: true
    },
    {
        path: '/about',
        component: About,
        name: 'About'
    }
];

const reloadOnScreenResize = true;

function App() {
    const { contextState, setContextState } = useContext(AppContext.Context);
    const imagesStillLoading = contextState[AppContextFields.GET_IMAGES_STILL_LOADING]();

    const [ spinnerWasClosed, setSpinnerWasClosed ] = useState(false);
    const [ spinnerWasUnmounted, setSpinnerWasUnmounted ] = useState(false);
    const [ showSpinnerLonger, setShowSpinnerLonger ] = useState(true);
    const showSpinner = imagesStillLoading || showSpinnerLonger;

    useEffect(() => {
        setContextState(prevState => ({
            ...prevState,
            [AppContextFields.GLOBAL_SPINNER_CLOSED]: spinnerWasClosed,
            [AppContextFields.GLOBAL_SPINNER_UNMOUNTED]: spinnerWasUnmounted
        }));
    }, [ spinnerWasClosed, spinnerWasUnmounted ]);

    useEffect(() => {
        if (!imagesStillLoading) {
            setTimeout(() => {
                setShowSpinnerLonger(false);
            }, 1750);
        }
    }, [ imagesStillLoading ]);

    useEffect(() => {
        window.addEventListener('unload', scrollWindowToTop);

        return () => {
            window.removeEventListener('unload', scrollWindowToTop);
        };
    }, []);

    const [ windowWasResized ] = useWindowResize();

    if (reloadOnScreenResize && windowWasResized) {
        window.location.reload();
    }

    const renderedRoutes = routes.map(routeAria => (
        <Route key={routeAria.path} {...routeAria} />
    ));

    if (isMicrosoftBrowser()) {
        return <IncompatibleBrowserFallback />
    }

    const renderedSpinner = (
        <SpinnerAtom
            show={showSpinner}
            onClose={() => setSpinnerWasClosed(true)}
            onUnmount={() => setSpinnerWasUnmounted(true)}
        />
    );

    return (
        <div className="App text-center font-didot-serif">
            <React.Suspense
                fallback={renderedSpinner}
            >
                <Router>
                    <React.Fragment>
                        {/*<Header navRoutes={routes} />*/}
                        {renderedRoutes}
                        <Footer />
                    </React.Fragment>
                </Router>
                {renderedSpinner}
            </React.Suspense>
        </div>
    );
}

export default App;
