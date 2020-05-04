import React from 'react';
import PropTypes from 'prop-types';
import ScrollToShow from 'components/ui/ScrollToShow';
import SectionCard from 'components/ui/SectionCard';
import Shape from 'components/ui/Shape';
import Link from 'components/ui/Link';
import { LINKS } from 'utils/Constants';
import { ETRADE_LINK } from 'utils/CommonRenders';

function GistSection(props) {
    const pageText = {
        title: 'Full-stack software engineer',
        description: (
            <React.Fragment>
                I build platforms at {ETRADE_LINK} for creating <Link href={LINKS.MutualFundsHome}>Mutual Fund/ETF </Link>
                investment plans. I have a passion for good coding practices, both for humans (readability, design patterns) and
                computers (efficiency). Enjoying my work is all about learning new things, making meaningful
                contributions, and collaborating with my teammates, because it's the people who make the workplace
                worthwhile.
            </React.Fragment>
        )
    };
    const sectionCardShowThreshold = 2/3;

    const renderedSection = (
        <SectionCard
            className={'mb-5'}
            mainContent={(
                <ScrollToShow addClasses={'slide-in-left show'} distributeClasses={'animated'} threshold={sectionCardShowThreshold}>
                    {SectionCard.renderDefaultTextContent(pageText.title, pageText.description)}
                </ScrollToShow>
            )}
        >
            <ScrollToShow addClasses={'slide-in-right show'} distributeClasses={'animated h-100'} threshold={sectionCardShowThreshold}>
                <Shape className={'h-100'} image={'profile_pic.jpg'} sides={6} rotation={90} />
            </ScrollToShow>
        </SectionCard>
    );

    return (
        <div className={props.className}>
            <ScrollToShow addClasses={'show'} distributeClasses={props.titleAnimationCls}>
                <h1 className={'p-5'}>The gist...</h1>
            </ScrollToShow>
            <div className={'d-block d-md-none container-fluid'}>
                {renderedSection}
            </div>
            <div className={'d-none d-md-block container'}>
                {renderedSection}
            </div>
        </div>
    );
}

GistSection.propTypes = {
    className: PropTypes.string,
    titleAnimationCls: PropTypes.string
};

GistSection.defaultProps = {
    className: '',
    titleAnimationCls: ''
};

export default GistSection;
