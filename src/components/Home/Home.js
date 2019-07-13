import React from 'react';
import SplashSection from 'components/Home/SplashSection';
import GistSection from 'components/Home/GistSection';

class Home extends React.Component {
    render() {
        // TODO What would you like to know about me? (list traits here)
        return (
            <React.Fragment>
                <SplashSection />
                <GistSection />
            </React.Fragment>
        );
    }
}

export default Home;
