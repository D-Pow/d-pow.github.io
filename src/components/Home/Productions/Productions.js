import React from 'react';
import ScrollToShow from 'components/ui/ScrollToShow';
import ImageCard from 'components/ui/ImageCard';
import Link from 'components/ui/Link';
import { LINKS } from 'utils/Constants';

function Productions(props) {
    const pageText = {
        imageCards: [
            {
                image: 'prebuilt_portfolios.jpg',
                title: <Link className={'text-light'} href={LINKS.PrebuiltPortfolios}>Prebuilt Portfolios</Link>,
                description: 'Selections of mutual funds to fit individual investment styles without needing to invest research time'
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
                    <ImageCard.SameHeightProvider>
                        <ScrollToShow addClasses={'flip-y show'} distributeClasses={'animated duration-15'} distributeSimultaneously={0.5}>
                            {pageText.imageCards.map((props, index) => {
                                const cls = 'col-sm-6 p-0';
                                // Center if odd number of items and last item
                                const centerCls = index % 2 === 0 && index === pageText.imageCards.length - 1 ? 'mx-auto' : '';

                                // Nest in div.col so ImageCard's ScrollToShow animation pertains only to image and not containing div
                                return (
                                    <div className={`${cls} ${centerCls}`} key={index}>
                                        <ImageCard imageCls={'w-100'} {...props} />
                                    </div>
                                );
                            })}
                        </ScrollToShow>
                    </ImageCard.SameHeightProvider>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Productions;
