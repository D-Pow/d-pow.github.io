import React from 'react';
import 'styles/SplashSection.scss';
import { Hooked, useHover } from 'utils/Hooks';

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
                <div className={'bg-dark'} style={{height: '100vh'}}>
                    <br/>
                    {Array.from({ length: 5 }).map((nul, i) => {
                        return (
                            <div className="row" key={i}>
                                {Array.from({ length: 5 }).map((nul2, j) => (
                                    <React.Fragment key={j}>
                                        <div
                                            className={'margin-center ripple'}
                                            style={{ width: '80px', height: '80px', background: 'transparent' }}
                                        />
                                    {/*<Hooked hook={useHover}>*/}
                                    {/*    {([ ref, isHovered ]) => (*/}
                                    {/*        <div*/}
                                    {/*            className={`margin-center ripple ${isHovered ? 'active' : ''}`}*/}
                                    {/*            style={{ width: '80px', height: '80px', background: 'transparent' }}*/}
                                    {/*            ref={ref}*/}
                                    {/*        />*/}
                                    {/*    )}*/}
                                    {/*</Hooked>*/}
                                    </React.Fragment>
                                ))}
                            </div>
                        );
                    })}
                </div>
                {this.renderWelcomeText()}
            </React.Fragment>
        );
    }
}

export default SplashSection;
