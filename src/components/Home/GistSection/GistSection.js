import React from 'react';
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

    return (
        <React.Fragment>
            <ScrollToShow addClasses={'show'} distributeClasses={'fade-in duration-20'}>
                <h1 className={'p-5 mb-5 bg-light'}>The gist...</h1>
            </ScrollToShow>
            <div className={'container'}>
                <SectionCard
                    className={'mb-5'}
                    mainContent={(
                        <ScrollToShow addClasses={'slide-in-left show'} distributeClasses={'animated'} threshold={sectionCardShowThreshold}>
                            {SectionCard.renderDefaultTextContent(pageText.title, pageText.description)}
                        </ScrollToShow>
                    )}
                >
                    <ScrollToShow addClasses={'slide-in-right show'} distributeClasses={'animated'} threshold={sectionCardShowThreshold}>
                        <Shape image={'profile_pic.jpg'} sides={6} rotation={90} />
                    </ScrollToShow>
                </SectionCard>
            </div>
        </React.Fragment>
    );
}

export default GistSection;
