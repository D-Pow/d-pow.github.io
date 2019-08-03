import React from 'react';
import ScrollToShow from 'components/ui/ScrollToShow';
import InfoCard from 'components/ui/InfoCard';
import Image from 'components/ui/Image';
import { ETRADE_LINK, ETRADE_MUTUAL_FUNDS_LINK } from 'utils/CommonRenders';

class GistSection extends React.Component {
    pageText = {
        gist: {
            title: 'Full-stack software engineer',
            description: (
                <React.Fragment>
                    I build platforms at {ETRADE_LINK} for creating {ETRADE_MUTUAL_FUNDS_LINK} investment plans.
                    I have a passion for good coding practices, both for humans (readability, design patterns) and
                    computers (efficiency). Enjoying my work is all about learning new things, making meaningful
                    contributions, and collaborating with my teammates, because it's the people who make the workplace
                    worthwhile.
                </React.Fragment>
            )
        }
    };

    renderGistSection() {
        return (
            <React.Fragment>
                <ScrollToShow addClasses={'fade-in-show'} distributeClasses={'fade-in'}>
                    <h1 className={'p-5 mb-5 bg-light'}>The gist...</h1>
                </ScrollToShow>
                <div className={'container'}>
                    <InfoCard
                        className={'mb-5'}
                        mainContent={(
                            <ScrollToShow addClasses={'slide-in-left show'} distributeClasses={' animated'}>
                                {InfoCard.renderDefaultTextContent(this.pageText.gist.title, this.pageText.gist.description)}
                            </ScrollToShow>
                        )}
                    >
                        <ScrollToShow addClasses={'slide-in-right show'} distributeClasses={'animated'}>
                            <div>
                                <Image image={'profile_pic.jpg'} aria={{style: { width: '80%' }}}/>
                            </div>
                        </ScrollToShow>
                    </InfoCard>
                </div>
            </React.Fragment>
        );
    }

    renderProductionsSection() {
        return (
            <h1 className={'p-5 mb-5'}>Productions</h1>
        );
    }

    renderProjectsSection() {
        return (
            <h1 className={'p-5 mb-5'}>Projects</h1>
        );
    }

    renderPastimesSection() {
        return (
            <h1 className={'p-5 mb-5'}>Pastimes</h1>
        );
    }

    renderPublicationsSection() {
        return (
            <h1 className={'p-5 mb-5'}>Publications</h1>
        );
    }

    renderPersonalContactSection() {
        return (
            <h1 className={'p-5 mb-5'}>Personal Contact</h1>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.renderGistSection()}
                {this.renderProductionsSection()}
                {this.renderProjectsSection()}
                {this.renderPastimesSection()}
                {this.renderPublicationsSection()}
                {this.renderPersonalContactSection()}
            </React.Fragment>
        );
    }
}

export default GistSection;
