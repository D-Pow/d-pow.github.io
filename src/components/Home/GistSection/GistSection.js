import React from 'react';
import ScrollToShow from 'components/ui/ScrollToShow';
import SectionCard from 'components/ui/SectionCard';
import ImageCard from 'components/ui/ImageCard';
import InfoCard from 'components/ui/InfoCard';
import HoverTranslate from 'components/ui/HoverTranslate';
import Shape from 'components/ui/Shape';
import Link from 'components/ui/Link';
import { LINKS } from 'utils/Constants';
import { getThemeColors } from 'utils/Functions';
import { ETRADE_LINK } from 'utils/CommonRenders';

class GistSection extends React.Component {
    pageText = {
        gist: {
            title: 'Full-stack software engineer',
            description: (
                <React.Fragment>
                    I build platforms at {ETRADE_LINK} for creating <Link href={LINKS.MutualFundsHome}>Mutual Fund/ETF</Link>
                    investment plans. I have a passion for good coding practices, both for humans (readability, design patterns) and
                    computers (efficiency). Enjoying my work is all about learning new things, making meaningful
                    contributions, and collaborating with my teammates, because it's the people who make the workplace
                    worthwhile.
                </React.Fragment>
            )
        },
        productions: {
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
        },
        projects: {
            infoCards: [
                {
                    image: 'atoms_of_confusion.jpg',
                    title: <Link className={'text-primary'} href={LINKS.AtomsOfConfusion}>Atoms of Confusion</Link>,
                    description: 'Research to understand fundamental causes of source code misunderstandings'
                },
                {
                    image: 'peptide_nmr.jpg',
                    title: <Link className={'text-primary'} href={LINKS.AnticancerPeptides}>Anti-cancer Polypeptides</Link>,
                    description: 'Research to develop polypeptides which destroy tumors upon proteolysis'
                },
                {
                    image: 'tardigrade.jpg',
                    title: <Link className={'text-primary'} href={LINKS.TardigradeStratification}>Tardigrade Stratification</Link>,
                    description: 'Research demonstrating tardigrade distributions and populations at various altitudes'
                }
            ]
        },
        pastimes: {
            hoverTranslate: {
                english: {
                    title: 'Japanese',
                    description: 'I have been learning Japanese for a little over a year. It\'s a lot of fun!'
                },
                japanese: {
                    title: '日本語',
                    description: 'ちょっと 一年 以上 日本語 を 学んで います。楽しい です よ！'
                }
            },
            otherPastimes: [
                <h4>This profile website</h4>,
                <React.Fragment><h4>Android Sync</h4><p>(iMessage remake)</p></React.Fragment>,
                <h4>Rock climbing</h4>,
                <h4>Playing guitar</h4>
            ]
        }
    };

    renderGistSection() {
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
                                {SectionCard.renderDefaultTextContent(this.pageText.gist.title, this.pageText.gist.description)}
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

    renderProductionsSection() {
        return (
            <React.Fragment>
                <ScrollToShow addClasses={'show'} distributeClasses={'fade-in duration-20'}>
                    <h1 className={'p-5 mb-5 bg-light'}>Productions</h1>
                </ScrollToShow>
                <div className={'container'}>
                    <div className={'row mb-5'}>
                        <ImageCard.SameHeightProvider>
                            <ScrollToShow addClasses={'flip-y show'} distributeClasses={'animated duration-15'} distributeSimultaneously={0.5}>
                                {this.pageText.productions.imageCards.map((props, index) => (
                                    // Nest in div.col so ImageCard's ScrollToShow animation pertains only to image and not containing div
                                    <div className={'col-sm-6 p-0'} key={index}>
                                        <ImageCard imageCls={'w-100'} {...props} />
                                    </div>
                                ))}
                            </ScrollToShow>
                        </ImageCard.SameHeightProvider>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    renderProjectsSection() {
        return (
            <React.Fragment>
                <ScrollToShow addClasses={'show'} distributeClasses={'fade-in duration-20'}>
                    <h1 className={'p-5 mb-5 bg-light'}>Projects and Publications</h1>
                </ScrollToShow>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'d-block d-sm-none'}>
                            <ScrollToShow addClasses={'slide-in-left show'} distributeClasses={'animated duration-15'}>
                                {this.pageText.projects.infoCards.map((props, index) => (
                                    <div className={'col-sm-4 mb-5 p-2 hover-expand hover-shadow-sm'} key={index}>
                                        <InfoCard {...props} />
                                    </div>
                                ))}
                            </ScrollToShow>
                        </div>
                        <div className={'d-none d-sm-flex'}>
                            <ScrollToShow addClasses={'slide-in-left show'} distributeClasses={'animated duration-15'} distributeSimultaneously={0.32}>
                                {this.pageText.projects.infoCards.map((props, index) => (
                                    <div className={'col-sm-4 mb-5 p-2 hover-expand hover-shadow-sm'} key={index}>
                                        <InfoCard {...props} />
                                    </div>
                                ))}
                            </ScrollToShow>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    renderPastimesSection() {
        const themeColors = getThemeColors();
        const { hoverTranslate: { english, japanese }, otherPastimes } = this.pageText.pastimes;

        return (
            <React.Fragment>
                <ScrollToShow addClasses={'show'} distributeClasses={'fade-in duration-20'}>
                    <h1 className={'p-5 mb-5 bg-light'}>Pastimes</h1>
                </ScrollToShow>
                <div className={'container'}>
                    <div className={'row mb-5'}>
                        <div className={'col-sm-6 mb-4'}>
                            <ScrollToShow addClasses={'slide-in-bottom show'} distributeClasses={'animated duration-15'}>
                                <div>
                                    <Shape sides={8} fill={themeColors.primary} />
                                    <HoverTranslate
                                        className={'text-light'}
                                        english={english}
                                        japanese={japanese}
                                    />
                                </div>
                            </ScrollToShow>
                        </div>
                        <div className={'col-sm-6'}>
                            <div className={'row'}>
                                <ScrollToShow addClasses={'slide-in-bottom show'} distributeClasses={'animated duration-15'} distributeSimultaneously={0.5}>
                                    {otherPastimes.map((project, index) => {
                                        const sides = 7 - index; // decrease each entry by 1, starting from Japanese at 8
                                        const rotation = (sides % 2) * -90;

                                        return (
                                            <div className={'col-sm-6'} key={index}>
                                                <Shape sides={sides} fill={themeColors.primary} rotation={rotation} />
                                                <div className={'absolute-center text-light mx-5'}>
                                                    {project}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </ScrollToShow>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
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
                {this.renderPersonalContactSection()}
            </React.Fragment>
        );
    }
}

export default GistSection;
