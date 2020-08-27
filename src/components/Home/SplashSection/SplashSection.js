import React, { useState, useEffect, useContext } from 'react';
import Image from 'components/ui/Image';
import SvgDrawingText from 'components/ui/SvgDrawingText';
import AppContext, { AppContextFields } from 'utils/AppContext';
import { distributeValuesEvenlyBetween } from 'utils/Numbers';
import 'styles/SplashSection.scss';

function SplashSection() {
    const { contextState } = useContext(AppContext.Context);
    const spinnerWasClosed = contextState[AppContextFields.GLOBAL_SPINNER_CLOSED];
    const [ showBgImage, setShowBgImage ] = useState(false);
    const drawingAnimationTimeMs = SvgDrawingText.defaultProps.animationDurationSeconds * 1000;

    useEffect(() => {
        if (spinnerWasClosed && !showBgImage) {
            // show mountain image after text-drawing animation has finished
            setTimeout(() => {
                setShowBgImage(true);
            }, drawingAnimationTimeMs);
        }
    }, [ spinnerWasClosed ]);

    function renderEvenlySpacedSkewedDrawingTexts(textArray) {
        const centerX = '50%';
        /*
         * Distribute text elements vertically such that there are equal
         * entries before/after the Y midpoint (y=50%), and closer to the center
         * than the edges.
         *
         * e.g. If 2 items, then 33% and 66%. If 3, then 25%, 50%, and 75%.
         */
        const evenlySpacedYValues = distributeValuesEvenlyBetween(0, 100, textArray.length);

        return textArray.map((text, i) => (
            <SvgDrawingText
                className={'font-brush-script'}
                key={i}
                fontSizeEm={1.5}
                style={{ transform: 'skewY(-5deg)' }}
                textElemProps={{
                    x: centerX,
                    y: `${Math.round(evenlySpacedYValues[i])}%`
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
        <section id={'splash'} className={'bg-dark full-screen-minus-scrollbar'}>
            <Image
                className={`w-100 h-100 animated fade duration-15 ${showBgImage ? 'show' : ''}`}
                image={'blue_horizon.svg'}
                fluidImage={false}
            />
            <div className={'absolute-center w-100 h-100'}>
                <div className={'h-75 w-80'}>
                    <svg className={'h-100 w-100'} viewBox={'0 0 100 100'}>
                        {renderedDrawingTexts}
                    </svg>
                </div>
            </div>
        </section>
    );
}

export default SplashSection;
