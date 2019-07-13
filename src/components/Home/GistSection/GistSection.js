import React from 'react';
import ScrollToShow from 'components/ui/ScrollToShow';

class GistSection extends React.Component {
    render() {
        return (
            <ScrollToShow className={'margin-center container'} addClasses={'fade-in-show'} distributeClasses={'fade-in'}>
                <h2 className={'p-5'}>The gist...</h2>
                <h4>Full-stack developer</h4>
            </ScrollToShow>
        );
    }
}

export default GistSection;
