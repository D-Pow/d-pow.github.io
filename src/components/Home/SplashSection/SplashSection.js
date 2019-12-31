import React from 'react';
import Image from 'components/ui/Image';
import 'styles/SplashSection.scss';

function SplashSection() {
    const pageText = {
        welcomeTitle: "Hey there, I'm Devon!"
    };
    const renderedWelcomeText = (
        <div className={'text-center position-absolute w-100 top-30'}>
            <div className={'bg-dark-fadeout rounded m-auto py-2 px-3 display-3'} style={{ width: '80%' }}>
                <h1 className={'text-white display-4'}>
                    <strong>
                        {pageText.welcomeTitle}
                    </strong>
                </h1>
            </div>
        </div>
    );

    return (
        <div className={'overflow-hidden'}>
            <Image
                className={'full-screen'}
                image={'blue_horizon.svg'}
                fluidImage={false}
            />
            {renderedWelcomeText}
        </div>
    );
}

export default SplashSection;
