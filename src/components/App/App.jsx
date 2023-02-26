import {
    lazy,
    Suspense,
    memo,
    useState,
    useEffect,
} from 'react';
import {
    HashRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';

import IncompatibleBrowserFallback from '@/components/App/IncompatibleBrowserFallback';
import SpinnerAtom from '@/components/ui/SpinnerAtom';
import { isMicrosoftBrowser } from '@/utils/BrowserIdentification';
import { scrollWindowToTop } from '@/utils/Events';
import { AppContextFields } from '@/utils/AppContext';
import { useWindowResize } from '@/utils/Hooks';

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

const homeImportPromise = import(/* webpackChunkName: 'Home' */ '@/components/Home');
const Home = lazy(() => homeImportPromise);

const aboutImportPromise = import(/* webpackChunkName: 'About' */ '@/components/About');
const About = lazy(() => aboutImportPromise);

const headerImportPromise = import(/* webpackChunkName: 'Header' */ '@/components/Header');
const Header = lazy(() => headerImportPromise);

const footerImportPromise = import(/* webpackChunkName: 'Footer' */ '@/components/Footer');
const Footer = lazy(() => footerImportPromise);


/** @typedef {import('react-router-dom').RouteProps[]} Routes */

/**
 * @type {Routes}
 *
 * @see [Docs on Route with(out) nested Route children]{@link https://reactrouter.com/docs/en/v6/api#routes-and-route}
 * @see [react-router v5 docs]{@link https://github.com/remix-run/react-router/tree/v5.3.1/packages/react-router/docs/api}
 * @see [Upgrading from v5 to v6]{@link https://gist.github.com/mjackson/b5748add2795ce7448a366ae8f8ae3bb}
 */
const routes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/about',
        element: <About />,
        name: 'About',
    },
];

function App({ imagesStillLoading, setContextState }) {
    const [ windowSizeState ] = useWindowResize();

    const [ showSpinnerLonger, setShowSpinnerLonger ] = useState(true);
    const showSpinner = imagesStillLoading || showSpinnerLonger;

    function handleSpinnerClose() {
        setContextState(prevState => ({
            ...prevState,
            [AppContextFields.GLOBAL_SPINNER_CLOSED]: true,
        }));
    }

    useEffect(() => {
        if (!imagesStillLoading) {
            setTimeout(() => {
                setShowSpinnerLonger(false);
            }, 750);
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
        return <IncompatibleBrowserFallback />;
    }

    const renderedSpinner = (
        <SpinnerAtom
            show={showSpinner}
            onClose={handleSpinnerClose}
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
            <Suspense
                fallback={renderedSpinner}
            >
                <Router>
                    {/* <Header navRoutes={routes} /> */}
                    <Routes>
                        {renderedRoutes}
                    </Routes>
                    <Footer />
                </Router>
                {renderedSpinner}
            </Suspense>
        </div>
    );
}

export default memo(App);
