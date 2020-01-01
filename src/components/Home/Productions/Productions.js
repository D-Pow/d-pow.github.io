import React from 'react';
import ScrollToShow from 'components/ui/ScrollToShow';
import { SameHeightImageCard } from 'components/ui/ImageCard';
import Link from 'components/ui/Link';
import { LINKS } from 'utils/Constants';

function Productions(props) {
    const pageText = {
        imageCards: [
            {
                image: 'prebuilt_portfolios.jpg',
                title: <Link className={'text-light'} href={LINKS.PrebuiltPortfolios}>Prebuilt Portfolios</Link>,
                description: 'Selections of mutual funds to fit individual investment styles'
            },
            {
                image: 'automatic_investing.jpg',
                title: <Link className={'text-light'} href={LINKS.AutomaticInvesting}>Automatic Investing</Link>,
                description: 'Automates investing into funds with varying frequencies and contribution amounts'
            },
            {
                image: 'premarket_modal.png',
                title: 'Pre-market Dashboard',
                description: 'Analyzes the health of internal systems before the markets open'
            },
            {
                image: 'edge_panel_widget.png',
                title: <Link className={'text-light'} href={LINKS.EtradeAndroidApp}>Edge Panel</Link>,
                description: 'Android widget for edge-devices to display a user\'s stock watch lists'
            },
            {
                image: 'mock_requests.png',
                title: <Link className={'text-light'} href={LINKS.MockRequests}>MockRequests</Link>,
                description: 'Open-source front-end network mocking system',
                className: 'bg-grey'
            }
        ]
    };

    return (
        <React.Fragment>
            <ScrollToShow addClasses={'show'} distributeClasses={'fade-in duration-20'}>
                <h1 className={'p-5 mb-5 bg-light'}>Productions</h1>
            </ScrollToShow>
            <div className={'container'}>
                <div className={'row mb-5'}>
                    <SameHeightImageCard.Provider>
                        <ScrollToShow addClasses={'flip-y show'} distributeClasses={'animated duration-15'} distributeSimultaneously={0.5}>
                            {pageText.imageCards.map((imageCardProps, index) => {
                                // Center if odd number of items and last item
                                const centerCls = index % 2 === 0 && index === pageText.imageCards.length - 1 ? 'mx-auto' : '';

                                // Nest in div.col so ImageCard's ScrollToShow animation pertains only to image and not containing div
                                return (
                                    <div className={`col-sm-6 p-0 ${centerCls}`} key={index}>
                                        {index !== 0 && (
                                            <div className={'d-block d-sm-none py-2'}>
                                                <div className={'segment-bar bg-dark'} />
                                            </div>
                                        )}
                                        <SameHeightImageCard widthFit={'w-100'} {...imageCardProps} />
                                    </div>
                                );
                            })}
                        </ScrollToShow>
                    </SameHeightImageCard.Provider>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Productions;
