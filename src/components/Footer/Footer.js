import React, { useState } from 'react';
import FlipCard from 'components/ui/FlipCard';
import { EasterEgg, SRC_CODE } from 'utils/CommonRenders';
import 'styles/Footer.scss';

function Footer(props) {
    const [ showSrcCode, setShowSrcCode ] = useState(false);

    const renderedPrompt = (
        <React.Fragment>
            <div className={'footer-title'}>There are 3 easter eggs on this site.</div>
            <div className={'footer-title'}>Can you find them all?
                <EasterEgg onClick={() => setShowSrcCode(!showSrcCode)} />
            </div>
        </React.Fragment>
    );
    const renderedSrcCode = (
        <React.Fragment>
            <div className={'footer-title'}>You just discovered the {SRC_CODE}!</div>
            <div className={'footer-title'}>
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
