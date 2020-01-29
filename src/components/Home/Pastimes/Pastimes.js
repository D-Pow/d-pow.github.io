import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ScrollToShow from 'components/ui/ScrollToShow';
import Shape from 'components/ui/Shape';
import HoverTranslate from 'components/ui/HoverTranslate';
import FlipCard from 'components/ui/FlipCard';
import { getThemeColors, isMobileBrowser, isSafariBrowser } from 'utils/Functions';
import { useTimedArrayToggle } from 'utils/Hooks';
import { EasterEgg } from 'utils/CommonRenders';

function Pastimes(props) {
    const [ showEasterEgg, setShowEasterEgg ] = useState(false);
    const pageText = {
        hoverTranslate: {
            english: {
                title: 'Japanese',
                description: 'I have been learning Japanese for a little over a year. It\'s a lot of fun!'
            },
            japanese: {
                title: (
                    <div className={isMobileBrowser({ includeTablets: true }) ? 'underline-extra-space' : ''}>
                        日本語
                    </div>
                ),
                description: 'ちょっと 一年 以上 日本語 を 学んで います。楽しい です よ！'
            }
        },
        otherPastimes: [
            {
                showDefault: 'Open-source projects',
                showWithEasterEgg: 'You should check out MockRequests'
            },
            {
                showDefault: 'Cooking',
                showWithEasterEgg: 'I just throw stuff in a pot and hope it tastes okay'
            },
            {
                showDefault: 'Rock climbing',
                showWithEasterEgg: 'Well... at least I used to go'
            },
            {
                showDefault: 'Playing guitar',
                showWithEasterEgg: 'Kind of, here and there'
            },
        ]
    };
    const themeColors = getThemeColors();
    const [ otherPastimesToggleArray, triggerToggleArray ] = useTimedArrayToggle(
        pageText.otherPastimes.length,
        400,
        true
    );

    // Safari doesn't correctly consider `foreignObject` as an SVG rendering root
    // so use the old way of manually positioning HoverTranslate over Shape but
    // only in Safari (see: https://bugs.webkit.org/show_bug.cgi?id=165516).
    // Add 'mx-4' to `animationCls` to add margins to the divs that are nested
    // inside the `div.absolute-center` elements and a font-size of 14px since
    // that's what is rendered on all other browsers.
    const renderedHoverTranslateInShape = isSafariBrowser() ? (
        <React.Fragment>
            <Shape sides={8} fill={themeColors.primary} />
            <HoverTranslate
                className={'text-light'}
                animationCls={'animated fade duration-5 mx-4'}
                english={pageText.hoverTranslate.english}
                japanese={pageText.hoverTranslate.japanese}
                aria={{
                    style: { fontSize: '14px' }
                }}
            />
        </React.Fragment>
    ) : (
        <Shape
            sides={8}
            fill={themeColors.primary}
            htmlChildrenFontReductionOptions={{ reduceByPx: 1 }} // only 1 HoverTranslate present
            htmlChildren={(resizeTextRef, foreignObjectBoundingClientRectInWindow) => (
                <HoverTranslate
                    className={'text-light'}
                    english={pageText.hoverTranslate.english}
                    japanese={pageText.hoverTranslate.japanese}
                    passedRef={resizeTextRef}
                    boundingClientRectForHover={foreignObjectBoundingClientRectInWindow}
                />
            )}
        />
    );
    const TextInShape = ({ textToRender, index }) => {
        const sides = 7 - index; // decrease each entry by 1, starting from Japanese at 8
        const rotation = (sides % 2) * -90;

        return (
            <Shape
                htmlChildren={textToRender}
                htmlChildrenWrapperCls={'text-light'}
                htmlChildrenFontReductionOptions={{
                    // reduce by number of pastimes to shrink how much space they take up
                    reduceByPx: pageText.otherPastimes.length
                }}
                sides={sides}
                fill={themeColors.primary}
                rotation={rotation}
            />
        );
    };
    const renderedOtherPastimes = (
        pageText.otherPastimes.map((pastimeTextFields, index) => {
            const axis = index % 2 === 0 ? FlipCard.AXES.X : FlipCard.AXES.Y;

            return (
                <div className={'col-sm-6'} key={index}>
                    <FlipCard
                        axis={axis}
                        durationCls={'duration-8'}
                        isFlipped={otherPastimesToggleArray[index]}
                        showDefault={<TextInShape textToRender={pastimeTextFields.showDefault} index={index} />}
                        showOnClick={<TextInShape textToRender={pastimeTextFields.showWithEasterEgg} index={index} />}
                    />
                </div>
            );
        })
    );

    const triggerEasterEggAnimation = () => {
        const finishedAnimating = otherPastimesToggleArray.every(isToggled => isToggled === otherPastimesToggleArray[0]);

        if (finishedAnimating) { // prevent clicking the title while the array is still toggling at the set interval
            setShowEasterEgg(!showEasterEgg);
            triggerToggleArray();
        }
    };
    const renderedTitleText = (
        <h1 className={'d-inline-block'} onClick={triggerEasterEggAnimation}>
            Pastimes
        </h1>
    );
    const renderedTitle = (
        <FlipCard
            className={'p-5'}
            isFlipped={showEasterEgg}
            showDefault={renderedTitleText}
            showOnClick={(
                <React.Fragment>
                    {renderedTitleText}
                    {' '}
                    <EasterEgg />
                </React.Fragment>
            )}
        />
    );

    return (
        <div className={'bg-light w-100 pb-5'}>
            <ScrollToShow addClasses={'show'} distributeClasses={props.titleAnimationCls}>
                {renderedTitle}
            </ScrollToShow>
            <div className={'container'}>
                <div className={'row mb-5'}>
                    <div className={'col-sm-6 mb-4'}>
                        <ScrollToShow addClasses={'slide-in-bottom show'} distributeClasses={'animated duration-15'}>
                            <div>
                                {renderedHoverTranslateInShape}
                            </div>
                        </ScrollToShow>
                    </div>
                    <div className={'col-sm-6'}>
                        <div className={'row'}>
                            <ScrollToShow addClasses={'slide-in-bottom show'} distributeClasses={'animated duration-15'} distributeSimultaneously={0.5}>
                                {renderedOtherPastimes}
                            </ScrollToShow>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Pastimes.propTypes = {
    titleAnimationCls: PropTypes.string
};

Pastimes.defaultProps = {
    titleAnimationCls: ''
};

export default Pastimes;
