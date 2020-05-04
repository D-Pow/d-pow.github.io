import React, { useState, useEffect, useContext } from 'react';
import Image from 'components/ui/Image';
import SvgDrawingText from 'components/ui/SvgDrawingText';
import AppContext, { AppContextFields } from 'utils/AppContext';
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
        const evenlySpacedY = textIndex => `${(100 / (textArray.length + 1)) * (textIndex + 1)}%`;

        return textArray.map((text, i) => (
            <SvgDrawingText
                className={'font-brush-script'}
                key={i}
                fontSizeEm={1.5}
                style={{ transform: 'skewY(-5deg)' }}
                textElemProps={{
                    x: centerX,
                    y: evenlySpacedY(i)
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
            <div className={'absolute-center'}>
                <svg className={'h-75 w-80'} viewBox={'0 0 100 100'}>
                    {renderedDrawingTexts}
                </svg>
            </div>
        </section>
    );
}

export default SplashSection;
