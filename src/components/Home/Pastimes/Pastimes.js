import React from 'react';
import ScrollToShow from 'components/ui/ScrollToShow';
import Shape from 'components/ui/Shape';
import HoverTranslate from 'components/ui/HoverTranslate';
import { getThemeColors, isMobileBrowser } from 'utils/Functions';

function Pastimes(props) {
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
            'Open-source projects',
            'Cooking',
            'Rock climbing',
            'Playing guitar'
        ]
    };
    const themeColors = getThemeColors();
    const { hoverTranslate: { english, japanese }, otherPastimes } = pageText;

    return (
        <React.Fragment>
            <ScrollToShow addClasses={'show'} distributeClasses={'animated fade duration-20'}>
                <h1 className={'p-5 mb-5 bg-light'}>Pastimes</h1>
            </ScrollToShow>
            <div className={'container'}>
                <div className={'row mb-5'}>
                    <div className={'col-sm-6 mb-4'}>
                        <ScrollToShow addClasses={'slide-in-bottom show'} distributeClasses={'animated duration-15'}>
                            <div>
                                <Shape sides={8} fill={themeColors.primary} />
                                <HoverTranslate
                                    className={'text-light'}
                                    english={english}
                                    japanese={japanese}
                                />
                            </div>
                        </ScrollToShow>
                    </div>
                    <div className={'col-sm-6'}>
                        <div className={'row'}>
                            <ScrollToShow addClasses={'slide-in-bottom show'} distributeClasses={'animated duration-15'} distributeSimultaneously={0.5}>
                                {otherPastimes.map((project, index) => {
                                    const sides = 7 - index; // decrease each entry by 1, starting from Japanese at 8
                                    const rotation = (sides % 2) * -90;

                                    return (
                                        <div className={'col-sm-6'} key={index}>
                                            <Shape
                                                text={project}
                                                textCls={'text-light'}
                                                sides={sides}
                                                fill={themeColors.primary}
                                                rotation={rotation}
                                            />
                                        </div>
                                    );
                                })}
                            </ScrollToShow>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Pastimes;
