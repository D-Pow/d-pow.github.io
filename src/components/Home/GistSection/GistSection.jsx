import PropTypes from 'prop-types';

import ScrollToShow from '@/components/ui/ScrollToShow';
import Shape from '@/components/ui/Shape';
import Anchor from '@/components/ui/Anchor';
import { LINKS } from '@/utils/Constants';
import {
    ETRADE_LINK,
    NEXTDOOR_LOGO,
    HOME_DEPOT_LOGO,
} from '@/utils/CommonRenders';
import { getGridBreakpoints } from '@/utils/Scss';

import '@/styles/GistSection.scss';

function GistSection(props) {
    const pageText = {
        title: 'Full-stack software engineer',
        description: (
            <>
                <div className={'mb-4'}>
                    <p style={{ fontSize: '1rem' }}>
                        As a principal software engineer at {HOME_DEPOT_LOGO}, I balance responsibilities between making
                        decisions for the company and onboarding our new (and current) coworkers. With my understanding
                        of the company's internal/external ecosystems, I have both enhanced the customer membership
                        experience for customers as well as reshaped the developer experience and mentored multiple new
                        hires as they join our teams.
                    </p>

                    <p style={{ fontSize: '1rem' }}>
                        Enjoying my work is all about learning new things, making
                        meaningful contributions, and collaborating with my teammates, because it's the
                        people who make the workplace worthwhile.
                    </p>
                </div>

                <div className={'mb-4'}>
                    I've also worked at:

                    <ul className={'previous-work'}>
                        <li>
                            <details>
                                <summary>Nextdoor</summary>

                                <p style={{ fontSize: '1rem' }}>
                                    As a lead front-end architect at {NEXTDOOR_LOGO}, I focused on improving both
                                    devs' and users' lives, including everything from founding our new SSR codebase to
                                    code architecture modernization, pipeline parallelization, accelerating build speed
                                    and client performance, and even local tool optimizations.
                                </p>
                            </details>
                        </li>

                        <li>
                            <details>
                                <summary>E-Trade</summary>

                                <p style={{ fontSize: '1rem' }}>
                                    I built platforms at {ETRADE_LINK} for creating
                                    {' '}<Anchor href={LINKS.MutualFundsHome}>Mutual Fund/ETF</Anchor>{' '} investment plans.
                                    I have a passion for good coding practices, both for humans (readability, design
                                    patterns)
                                    and computers (efficiency).
                                </p>
                            </details>
                        </li>
                    </ul>
                </div>
            </>
        ),
    };
    const mainContentShowThreshold = 2 / 3;

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
