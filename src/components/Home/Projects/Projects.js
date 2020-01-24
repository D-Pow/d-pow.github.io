import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ScrollToShow from 'components/ui/ScrollToShow';
import InfoCard from 'components/ui/InfoCard';
import Link from 'components/ui/Link';
import { LINKS } from 'utils/Constants';
import { isMobileBrowser } from 'utils/Functions';

function Projects(props) {
    const [ animationDuration, setAnimationDuration ] = useState('duration-15');
    const pageText = {
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
    };
    const isMobile = isMobileBrowser({ onlyXsScreenSizes: true });
    const projectEntriesScrollToShowClassProps = {
        addClasses: 'slide-in-left show',
        distributeClasses: 'animated ' + animationDuration
    };
    const infoCardWrapperHoverCls = isMobile ? '' : 'hover-expand hover-shadow-sm';
    const projectInfoCardEntries = pageText.infoCards.map((props, index) => (
        <div className={`col-sm-4 mb-5 p-2 ${infoCardWrapperHoverCls}`} key={index}>
            <InfoCard {...props} />
        </div>
    ));

    return (
        <React.Fragment>
            <ScrollToShow addClasses={'show'} distributeClasses={props.titleAnimationCls}>
                <h1 className={'p-5'}>Projects and Publications</h1>
            </ScrollToShow>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'d-block d-sm-none'}>
                        <ScrollToShow {...projectEntriesScrollToShowClassProps}>
                            {projectInfoCardEntries}
                        </ScrollToShow>
                    </div>
                    <div className={'d-none d-sm-flex'}>
                        <ScrollToShow
                            {...projectEntriesScrollToShowClassProps}
                            distributeSimultaneously={0.32}
                            onAllChildrenShown={() => {
                                if (!isMobile) {
                                    // Two animations (.slide-in-left and .hover-expand) are attached to each InfoCard
                                    // but the prolonged .duration-XX class is only desired for the .slide-in-left
                                    // animation.
                                    // Thus, unset .duration-XX so that the default .hover-expand CSS class
                                    // sets the transition-duration.
                                    // Only do it on mobile because .d-none still renders the components, just
                                    // with `display: none;` and we don't want to remove .duration-XX after
                                    // rendering components that aren't seen.
                                    setAnimationDuration('');
                                }
                            }}
                        >
                            {projectInfoCardEntries}
                        </ScrollToShow>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

Projects.propTypes = {
    titleAnimationCls: PropTypes.string
};

Projects.defaultProps = {
    titleAnimationCls: ''
};

export default Projects;
