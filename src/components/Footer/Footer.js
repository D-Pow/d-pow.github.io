import React, { useState } from 'react';
import { EASTER_EGG, SRC_CODE } from 'utils/CommonRenders';
import 'styles/Footer.scss';

function Footer(props) {
    const [ showSrcCode, setShowSrcCode ] = useState(false);
    const animationCls = 'duration-5';
    const showCls = 'flip-x-full';
    const hideCls = 'd-none';

    const renderedEgg = (
        <div className={'d-inline-block'} onClick={() => setShowSrcCode(!showSrcCode)}>
            {EASTER_EGG}
        </div>
    );
    const renderedPrompt = (
        <div className={`${animationCls} ${showSrcCode ? hideCls : showCls}`}>
            <div className={'footer-title'}>There are 3 easter eggs on this site.</div>
            <div className={'footer-title'}>Can you find them all?
                {renderedEgg}
            </div>
        </div>
    );
    const renderedSrcCode = (
        <div className={`${animationCls} ${showSrcCode ? showCls : hideCls}`}>
            <div className={'footer-title'}>You just discovered the {SRC_CODE}!</div>
            <div className={'footer-title'}>
                {renderedEgg}
            </div>
        </div>
    );

    return (
        <footer className={'footer-container w-100'}>
            {renderedPrompt}
            {renderedSrcCode}
        </footer>
    );
}

export default Footer;
