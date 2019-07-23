import React from 'react';
import ScrollToShow from 'components/ui/ScrollToShow';
import InfoCard from 'components/ui/InfoCard';
import { ETRADE_LINK } from 'utils/CommonRenders';

class GistSection extends React.Component {
    pageText = {
        infoCards: [
            {
                title: 'Full-stack software engineer',
                description: (<React.Fragment>I build platforms at E-Trade for creating {ETRADE_LINK} investment plans</React.Fragment>),
                children: (
                    <React.Fragment>
                        <h5>Major interests include:</h5>
                        <ul>
                            <li>Design patterns</li>
                            <li>App architecture</li>
                            <li>Security</li>
                            <li>Good source control practices</li>
                        </ul>
                    </React.Fragment>
                )
            }
        ]
    };

    render() {
        return (
            <ScrollToShow className={'margin-center container'} addClasses={'fade-in-show'} distributeClasses={'fade-in'}>
                <h2 className={'p-5'}>The gist...</h2>
                {this.pageText.infoCards.map((content, index) => (<InfoCard {...content} key={index} />))}
            </ScrollToShow>
        );
    }
}

export default GistSection;
