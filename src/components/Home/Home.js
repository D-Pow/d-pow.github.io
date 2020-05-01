import React from 'react';
import SplashSection from 'components/Home/SplashSection';
import GistSection from 'components/Home/GistSection';
import Productions from 'components/Home/Productions';
import Projects from 'components/Home/Projects';
import Pastimes from 'components/Home/Pastimes';
import PersonalContact from 'components/Home/PersonalContact';

function Home(props) {
    const titleDisplayAnimationCls = 'animated fade duration-10';

    return (
        <React.Fragment>
            <SplashSection />
            <GistSection titleAnimationCls={titleDisplayAnimationCls} />
            <Productions titleAnimationCls={titleDisplayAnimationCls} />
            <Projects titleAnimationCls={titleDisplayAnimationCls} />
            <Pastimes titleAnimationCls={titleDisplayAnimationCls} />
            <PersonalContact titleAnimationCls={titleDisplayAnimationCls} />
        </React.Fragment>
    );
}

export default Home;
