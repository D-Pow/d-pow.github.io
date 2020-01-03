import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from 'components/Home';
import About from 'components/About';
import Header from 'components/Header';
import Footer from 'components/Footer';

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
    const renderedRoutes = routes.map(routeAria => (
        <Route key={routeAria.path} {...routeAria} />
    ));

    return (
        <div className="App text-center">
            <Router>
                <React.Fragment>
                    {/*<Header navRoutes={routes} />*/}
                    {renderedRoutes}
                    <Footer />
                </React.Fragment>
            </Router>
        </div>
    );
}

export default App;
