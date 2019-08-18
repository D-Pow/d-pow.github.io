import React from 'react';
import SplashSection from 'components/Home/SplashSection';
import GistSection from 'components/Home/GistSection';
import Productions from 'components/Home/Productions';
import Projects from 'components/Home/Projects';
import Pastimes from 'components/Home/Pastimes';
import PersonalContact from 'components/Home/PersonalContact';

function Home(props) {
    return (
        <React.Fragment>
            <SplashSection />
            <GistSection />
            <Productions />
            <Projects />
            <Pastimes />
            <PersonalContact />
        </React.Fragment>
    );
}

export default Home;
