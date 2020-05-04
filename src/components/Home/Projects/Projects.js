import React from 'react';
import PropTypes from 'prop-types';
import ScrollToShow from 'components/ui/ScrollToShow';
import InfoCard from 'components/ui/InfoCard';
import Link from 'components/ui/Link';
import { LINKS } from 'utils/Constants';
import { isMobileBrowser } from 'utils/BrowserIdentification';

function Projects(props) {
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
    const projectEntriesScrollToShowClassProps = {
        addClasses: 'slide-in-left show',
        distributeClasses: 'animated duration-15'
    };
    const infoCardWrapperHoverCls = isMobileBrowser({ onlyXsScreenSizes: true }) ? '' : 'hover-expand hover-shadow-sm';
    const projectInfoCardEntries = pageText.infoCards.map((props, index) => (
        <div className={`col-sm-4 mb-5 p-2 ${infoCardWrapperHoverCls}`} key={index}>
            <InfoCard {...props} />
        </div>
    ));

    return (
        <section id={'projects'} className={props.className}>
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
                    <div className={'d-none d-sm-flex w-100'}>
                        <ScrollToShow {...projectEntriesScrollToShowClassProps} distributeSimultaneously={0.32}>
                            {projectInfoCardEntries}
                        </ScrollToShow>
                    </div>
                </div>
            </div>
        </section>
    );
}

Projects.propTypes = {
    className: PropTypes.string,
    titleAnimationCls: PropTypes.string
};

Projects.defaultProps = {
    className: '',
    titleAnimationCls: ''
};

export default Projects;
