import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Image from '@/components/ui/Image';
import SvgDrawingText, { EvenlySpacedSkewedDrawingTexts } from '@/components/ui/SvgDrawingText';
import '@/styles/SplashSection.scss';

function SplashSection({ spinnerWasClosed }) {
    const [ showBgImage, setShowBgImage ] = useState(false);
    const drawingAnimationTimeMs = SvgDrawingText.defaultProps.animationDurationSeconds * 1000;
    const textToDisplay = [ 'Hey there,', "I'm Devon!" ];

    useEffect(() => {
        if (spinnerWasClosed && !showBgImage) {
            // show mountain image after text-drawing animation has finished
            setTimeout(() => {
                setShowBgImage(true);
            }, drawingAnimationTimeMs);
        }
    }, [ spinnerWasClosed, drawingAnimationTimeMs ]);

    const renderedDrawingTexts = spinnerWasClosed
        ? <EvenlySpacedSkewedDrawingTexts textArray={textToDisplay} />
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

SplashSection.propTypes = {
    spinnerWasClosed: PropTypes.bool
}

export default React.memo(SplashSection);
