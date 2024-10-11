import PropTypes from 'prop-types';

import ScrollToShow from '@/components/ui/ScrollToShow';
import { SameHeightImageCard } from '@/components/ui/ImageCard';
import Anchor from '@/components/ui/Anchor';
import { LINKS } from '@/utils/Constants';

function Productions(props) {
    const pageText = {
        imageCards: [
            {
                image: 'home_depot_pos.png',
                title: <Anchor className={'text-light'} href={LINKS.HomeDepotHome}>The Home Depot</Anchor>,
                description: 'Point of Sale, self-checkout, and loyalty management',
            },
            {
                image: 'nextdoor_feed_sample.png',
                title: <Anchor className={'text-light'} href={LINKS.NextdoorHome}>Nextdoor code foundation</Anchor>,
                description: 'Nextdoor full website architecture, state management, build cycle, etc.',
            },
            {
                image: 'prebuilt_portfolios.jpg',
                title: <Anchor className={'text-light'} href={LINKS.PrebuiltPortfolios}>Prebuilt Portfolios</Anchor>,
                description: 'Selections of funds to fit individual investment styles',
            },
            {
                image: 'automatic_investing.jpg',
                title: <Anchor className={'text-light'} href={LINKS.AutomaticInvesting}>Automatic Investing</Anchor>,
                description: 'Automates investing with varying frequencies and amounts',
            },
            {
                image: 'premarket_modal.png',
                title: 'Premarket Dashboard',
                description: 'Analyzes the health of internal systems before markets open',
            },
            {
                image: 'edge_panel_widget.png',
                title: <Anchor className={'text-light'} href={LINKS.EtradeAndroidApp}>Edge Panel</Anchor>,
                description: 'Android widget for edge-devices to display stock watch lists',
            },
            {
                image: 'mock_requests.png',
                title: <Anchor className={'text-light'} href={LINKS.MockRequests}>MockRequests</Anchor>,
                description: 'Open-source JS network mocking system',
                imageCls: 'h-100 w-auto',
                className: 'bg-lighter',
            },
            {
                image: 'anime_atsume.jpg',
                title: <Anchor className={'text-light'} href={LINKS.AnimeAtsumeGitHub}>Anime Atsume</Anchor>,
                description: 'Aggregator for searching and watching anime',
            },
        ],
    };

    return (
        <section id={'productions'} className={'bg-light w-100 pb-5 ' + props.className}>
            <ScrollToShow addClasses={'show'} distributeClassesBeforeShow={props.titleAnimationCls}>
                <h1 className={'p-5'}>Productions</h1>
            </ScrollToShow>
            <div className={'container'}>
                <div className={'row'}>
                    <SameHeightImageCard.Provider>
                        <ScrollToShow
                            addClasses={'flip-y show'}
                            distributeClassesBeforeShow={'animated duration-10'}
                            distributeSimultaneouslyInterval={0.5}
                        >
                            {pageText.imageCards.map((imageCardProps, index) => {
                                // Center if odd number of items and last item
                                const centerCls = index % 2 === 0 && index === pageText.imageCards.length - 1 ? 'mx-auto' : '';

                                // Nest in div.col so ImageCard's ScrollToShow animation pertains only to image and not containing div
                                return (
                                    <div className={`col-sm-6 p-0 ${centerCls}`} key={index}>
                                        {index !== 0 && (
                                            <div className={'d-block d-sm-none flex-center w-90 py-2'}>
                                                <div className={'segment-bar bg-dark'} />
                                            </div>
                                        )}
                                        <SameHeightImageCard
                                            widthFit={SameHeightImageCard.WidthFits.STRETCH}
                                            wrapperCls={'m-2'}
                                            showBorder={true}
                                            {...imageCardProps}
                                        />
                                    </div>
                                );
                            })}
                        </ScrollToShow>
                    </SameHeightImageCard.Provider>
                </div>
            </div>
        </section>
    );
}

Productions.propTypes = {
    className: PropTypes.string,
    titleAnimationCls: PropTypes.string,
};

Productions.defaultProps = {
    className: '',
    titleAnimationCls: '',
};

export default Productions;
