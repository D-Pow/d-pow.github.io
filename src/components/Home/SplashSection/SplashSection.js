import React from 'react';
import FullPageTriangles from 'components/ui/FullPageTriangles';
import 'styles/SplashSection.scss';

class SplashSection extends React.Component {
    pageText = {
        welcomeTitle: "Hey there, I'm Devon!"
    };

    renderWelcomeText() {
        return (
            <div className={'text-center position-absolute w-100 top-30'}>
                <div className={'bg-dark-fadeout rounded m-auto py-2 px-3 display-3'} style={{width: '80%'}}>
                    <h1 className={'text-white display-4'}><strong>{this.pageText.welcomeTitle}</strong></h1>
                </div>
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                <FullPageTriangles numRows={8} />
                {this.renderWelcomeText()}
            </React.Fragment>
        );
    }
}

export default SplashSection;
