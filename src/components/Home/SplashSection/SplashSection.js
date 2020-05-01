import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Image from 'components/ui/Image';
import SvgDrawingText from 'components/ui/SvgDrawingText';
import { isMobileBrowser } from 'utils/Functions';
import AppContext, { AppContextFields } from 'utils/AppContext';
import 'styles/SplashSection.scss';

function DrawingTextSplashSection() {
    const { contextState } = useContext(AppContext.Context);
    const spinnerWasClosed = contextState[AppContextFields.GLOBAL_SPINNER_CLOSED];

    function renderEvenlySpacedSkewedDrawingTexts(textArray) {
        const centerX = '50%';
        /*
         * Distribute text elements vertically such that there are equal
         * entries before/after the Y midpoint (y=50%), and closer to the center
         * than the edges.
         *
         * e.g. If 2 items, then 33% and 66%. If 3, then 25%, 50%, and 75%.
         */
        const evenlySpacedY = textIndex => `${(100 / (textArray.length + 1)) * (textIndex + 1)}%`;

        return textArray.map((text, i) => (
            <SvgDrawingText
                className={'font-brush-script'}
                key={i}
                fontSizeEm={1.5}
                style={{ transform: 'skewY(-5deg)' }}
                textElemProps={{
                    x: centerX,
                    y:evenlySpacedY(i)
                }}
            >
                {text}
            </SvgDrawingText>
        ));
    }

    const renderedDrawingTexts = spinnerWasClosed
        ? renderEvenlySpacedSkewedDrawingTexts([ 'Hey there,', "I'm Devon!" ])
        : '';

    return (
        <div className={'full-screen-minus-scrollbar flex-center bg-dark'}>
            <svg className={'h-75 w-80'} viewBox={'0 0 100 100'}>
                {renderedDrawingTexts}
            </svg>
        </div>
    );
}

function MountainBackgroundSplashSection() {
    const pageText = {
        welcomeTitle: "Hey there, I'm Devon!"
    };
    const textSize = isMobileBrowser() ? 'display-5' : 'display-4';
    const DisabledTextBoldOnMobile = isMobileBrowser() ? React.Fragment : 'strong';
    const renderedTextOnShadow = (
        <div className={'container'}>
            <div className={'row justify-content-center'}>
                <div className={'col-sm-10'}>
                    <div className={'bg-dark-fadeout rounded w-80 m-auto py-2 px-3'}>
                        <h1 className={`text-white ${textSize}`}>
                            <DisabledTextBoldOnMobile>
                                {pageText.welcomeTitle}
                            </DisabledTextBoldOnMobile>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
    const absoluteSpacedContainerClasses = 'text-center position-absolute w-100';
    const renderedAbsoluteSpacedContainer = (
        <React.Fragment>
            <div className={'d-block d-sm-none'}>
                <div className={`${absoluteSpacedContainerClasses} top-15`}>
                    {renderedTextOnShadow}
                </div>
            </div>
            <div className={'d-none d-sm-block'}>
                <div className={`${absoluteSpacedContainerClasses} top-20`}>
                    {renderedTextOnShadow}
                </div>
            </div>
        </React.Fragment>
    );

    return (
        <div className={'overflow-hidden'}>
            <Image
                className={'full-screen'}
                image={'blue_horizon.svg'}
                fluidImage={false}
            />
            {renderedAbsoluteSpacedContainer}
        </div>
    );
}

function SplashSection(props) {
    const componentTypes = {
        [SplashSection.Types.DRAWING_TEXT]: DrawingTextSplashSection,
        [SplashSection.Types.MOUNTAIN_BACKGROUND]: MountainBackgroundSplashSection
    };
    const Component = componentTypes[props.type];

    return <Component />;
}

SplashSection.Types = {
    DRAWING_TEXT: 'DrawingText',
    MOUNTAIN_BACKGROUND: 'MountainBackground'
};

SplashSection.propTypes = {
    type: PropTypes.oneOf(Object.values(SplashSection.Types))
};

SplashSection.defaultProps = {
    type: SplashSection.Types.DRAWING_TEXT
};

export default SplashSection;
