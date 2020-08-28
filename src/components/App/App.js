import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import SpinnerAtom from 'components/ui/SpinnerAtom';
import IncompatibleBrowserFallback from './IncompatibleBrowserFallback';
import { isMicrosoftBrowser } from 'utils/BrowserIdentification';
import { scrollWindowToTop } from 'utils/Events';
import { AppContextFields } from 'utils/AppContext';
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

function App({ imagesStillLoading, setContextState }) {
    const [ windowSizeState ] = useWindowResize();

    const [ spinnerWasClosed, setSpinnerWasClosed ] = useState(false);
    const [ showSpinnerLonger, setShowSpinnerLonger ] = useState(true);
    const showSpinner = imagesStillLoading || showSpinnerLonger;

    useEffect(() => {
        setContextState(prevState => ({
            ...prevState,
            [AppContextFields.GLOBAL_SPINNER_CLOSED]: spinnerWasClosed
        }));
    }, [ spinnerWasClosed ]);

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

    const renderedRoutes = routes.map(routeAria => (
        <Route key={routeAria.path} {...routeAria} />
    ));

    if (isMicrosoftBrowser()) {
        return <IncompatibleBrowserFallback />
    }

    const renderSpinner = preventScrolling => (
        <SpinnerAtom
            preventDocumentScrolling={preventScrolling}
            show={showSpinner}
            onClose={() => setSpinnerWasClosed(true)}
        />
    );

    // Force the app to re-render on window resize to make renders
    // dependent on isMobileBrowser() to be responsive, since that
    // util function isn't responsive on its own.
    // Changing the `key` prop in functional components is equivalent
    // to calling a class component's forceUpdate().
    return (
        <div
            className="App text-center font-didot-serif"
            key={`${windowSizeState.prevWidth}x${windowSizeState.prevHeight}`}
        >
            <React.Suspense
                fallback={renderSpinner(false)}
            >
                <Router>
                    <React.Fragment>
                        {/*<Header navRoutes={routes} />*/}
                        {renderedRoutes}
                        <Footer />
                    </React.Fragment>
                </Router>
                {renderSpinner(true)}
            </React.Suspense>
        </div>
    );
}

export default React.memo(App);
