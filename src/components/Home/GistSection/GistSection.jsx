import PropTypes from 'prop-types';

import ScrollToShow from '@/components/ui/ScrollToShow';
import Shape from '@/components/ui/Shape';
import Link from '@/components/ui/Link';
import { LINKS } from '@/utils/Constants';
import { ETRADE_LINK, NEXTDOOR_LOGO } from '@/utils/CommonRenders';
import { getGridBreakpoints } from '@/utils/Scss';

function GistSection(props) {
    const pageText = {
        title: 'Full-stack software engineer',
        description: (
            <>
                <div className={'mb-4'}>
                    I'm a lead front-end architect at {NEXTDOOR_LOGO}, where I focus on improving both devs' and users'
                    lives, including everything from accelerating build speed and client performance, to code architecture
                    and modernization, and even to local tool optimizations.
                    Enhancing our devs' lives means features get delivered faster, stabler, and cleaner, resulting in an
                    overall more enjoyable experience for all of us.
                </div>

                <details>
                    <summary>I've also worked at E-Trade!</summary>

                    I built platforms at {ETRADE_LINK} for creating <Link href={LINKS.MutualFundsHome}>Mutual Fund/ETF</Link>{' '}
                    investment plans. I have a passion for good coding practices, both for humans (readability, design patterns) and
                    computers (efficiency). Enjoying my work is all about learning new things, making meaningful
                    contributions, and collaborating with my teammates, because it's the people who make the workplace
                    worthwhile.
                </details>
            </>
        ),
    };
    const mainContentShowThreshold = 2/3;

    return (
        <section id={'the-gist'} className={props.className}>
            <ScrollToShow addClasses={'show'} distributeClassesBeforeShow={props.titleAnimationCls}>
                <h1 className={'p-5'}>The gist...</h1>
            </ScrollToShow>
            <div className={`container${window.innerWidth <= getGridBreakpoints().md ? '-fluid' : ''} mb-5`}>
                <div className={'row'}>
                    <ScrollToShow
                        addClasses={'show'}
                        distributeClassesBeforeShow={'animated'}
                        threshold={mainContentShowThreshold}
                        distributeSimultaneouslyInterval={0}
                    >
                        <div className={'col-sm-6 m-auto pb-4 slide-in-left'}>
                            <div className={'m-auto'}>
                                <h3 className={'p-2'}>{pageText.title}</h3>
                                <>{pageText.description}</>
                            </div>
                        </div>
                        <div className={'col-sm-6 m-auto slide-in-right'}>
                            <Shape
                                className={'h-100'}
                                image={'profile_pic.jpg'}
                                sides={6}
                                rotation={90}
                            />
                        </div>
                    </ScrollToShow>
                </div>
            </div>
        </section>
    );
}

GistSection.propTypes = {
    className: PropTypes.string,
    titleAnimationCls: PropTypes.string,
};

GistSection.defaultProps = {
    className: '',
    titleAnimationCls: '',
};

export default GistSection;
