import React from 'react';
import SplashSection from 'components/Home/SplashSection';

class Home extends React.Component {
    render() {
        // TODO What would you like to know about me? (list traits here)
        return (
            <React.Fragment>
                <SplashSection />
                <div style={{height: '500px'}}>Meh</div>
            </React.Fragment>
        );
    }
}

export default Home;
