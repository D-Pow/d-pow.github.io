import React from 'react';
import SplashSection from 'components/Home/SplashSection';
import GistSection from 'components/Home/GistSection';
import Productions from 'components/Home/Productions';
import Projects from 'components/Home/Projects';
import Pastimes from 'components/Home/Pastimes';
import PersonalContact from 'components/Home/PersonalContact';
import { isMicrosoftBrowser } from 'utils/Functions';

function Home() {
    const titleDisplayAnimationCls = 'animated fade duration-10';
    const showPastimes = !isMicrosoftBrowser(false);
    const backgroundColorAlternations = [
        '',     // default background color = $lightest as defined in Common.scss
        'bg-light'
    ];
    const sections = [
        GistSection,
        Productions,
        Projects,
    ];

    if (showPastimes) {
        sections.push(Pastimes);
    }

    sections.push(PersonalContact);

    return (
        <React.Fragment>
            <SplashSection />
            {sections.map((Component, i) => (
                <Component
                    className={backgroundColorAlternations[i % 2]}
                    titleAnimationCls={titleDisplayAnimationCls}
                    key={i}
                />
            ))}
        </React.Fragment>
    );
}

export default Home;
