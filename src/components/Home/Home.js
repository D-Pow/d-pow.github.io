import React, { useState } from 'react';
import SplashSection from 'components/Home/SplashSection';
import GistSection from 'components/Home/GistSection';
import Productions from 'components/Home/Productions';
import Projects from 'components/Home/Projects';
import Pastimes from 'components/Home/Pastimes';
import PersonalContact from 'components/Home/PersonalContact';
import ToastMessage from 'components/ui/ToastMessage';
import { UPDATE_BROADCAST } from 'utils/Constants';
import { useServiceWorkerBroadcastChannel } from 'utils/Hooks';

function Home() {
    const [ appWasUpdated, setAppWasUpdated ] = useState(false);
    const titleDisplayAnimationCls = 'animated fade duration-10';

    useServiceWorkerBroadcastChannel(({ data: message }) => {
        if (message === UPDATE_BROADCAST) {
            setAppWasUpdated(true);
        }
    });

    return (
        <React.Fragment>
            <ToastMessage
                float={ToastMessage.Positions.RIGHT}
                header={'Please refresh the page'}
                show={appWasUpdated}
                hideAfterDelay={15000}
                onClose={() => setAppWasUpdated(false)}
            >
                The website has recently been updated. Refresh the page to get the latest content.
            </ToastMessage>
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
