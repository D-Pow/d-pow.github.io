import React, { useState } from 'react';
import FlipCard from 'components/ui/FlipCard';
import { EasterEgg, SRC_CODE } from 'utils/CommonRenders';

function Footer(props) {
    const [ showSrcCode, setShowSrcCode ] = useState(false);

    const renderedPrompt = (
        <React.Fragment>
            <div className={'d-block h5 text-dark'}>There are 3 easter eggs on this site.</div>
            <div className={'d-block h5 text-dark'}>Can you find them all?
                <EasterEgg onClick={() => setShowSrcCode(!showSrcCode)} />
            </div>
        </React.Fragment>
    );
    const renderedSrcCode = (
        <React.Fragment>
            <div className={'d-block h5 text-dark'}>You just discovered the {SRC_CODE}!</div>
            <div className={'d-block h5 text-dark'}>
                <EasterEgg onClick={() => setShowSrcCode(!showSrcCode)} />
            </div>
        </React.Fragment>
    );

    return (
        <footer className={'bg-light py-3 w-100'}>
            <FlipCard
                isFlipped={showSrcCode}
                showDefault={renderedPrompt}
                showOnClick={renderedSrcCode}
            />
        </footer>
    );
}

export default Footer;
