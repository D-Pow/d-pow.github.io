import React from 'react';
import SplashSection from 'components/Home/SplashSection';
import IntroGrid from 'components/Home/IntroGrid';

class Home extends React.Component {
    render() {
        // TODO What would you like to know about me? (list traits here)
        return (
            <React.Fragment>
                <SplashSection />
                <IntroGrid />
            </React.Fragment>
        );
    }
}

export default Home;
