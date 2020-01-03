import React, { useState, useEffect, useContext } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from 'components/Home';
import About from 'components/About';
import Header from 'components/Header';
import Footer from 'components/Footer';
import SpinnerAtom from 'components/ui/SpinnerAtom';
import AppContext from 'utils/AppContext';

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

function App() {
    const [ showSpinnerLonger, setShowSpinnerLonger ] = useState(true);
    const renderedRoutes = routes.map(routeAria => (
        <Route key={routeAria.path} {...routeAria} />
    ));
    const { contextState: { imagesRequested, imagesLoaded }} = useContext(AppContext.Context);
    const imagesHaveBeenRequested = imagesRequested > 0;
    const imagesHaveFinishedLoading = imagesLoaded === imagesRequested;
    const imagesStillLoading = !imagesHaveBeenRequested || !imagesHaveFinishedLoading;
    const showSpinner = imagesStillLoading || showSpinnerLonger;

    useEffect(() => {
        if (!imagesStillLoading) {
            setTimeout(() => {
                setShowSpinnerLonger(false);
            }, 1750);
        }
    }, [imagesStillLoading]);

    return (
        <div className="App text-center">
            <Router>
                <React.Fragment>
                    {/*<Header navRoutes={routes} />*/}
                    {renderedRoutes}
                    <Footer />
                </React.Fragment>
            </Router>
            <SpinnerAtom show={showSpinner} />
        </div>
    );
}

export default App;
