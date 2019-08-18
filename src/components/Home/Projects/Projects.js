import React from 'react';
import ScrollToShow from 'components/ui/ScrollToShow';
import InfoCard from 'components/ui/InfoCard';
import Link from 'components/ui/Link';
import { LINKS } from 'utils/Constants';

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

    return (
        <React.Fragment>
            <ScrollToShow addClasses={'show'} distributeClasses={'fade-in duration-20'}>
                <h1 className={'p-5 mb-5 bg-light'}>Projects and Publications</h1>
            </ScrollToShow>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'d-block d-sm-none'}>
                        <ScrollToShow addClasses={'slide-in-left show'} distributeClasses={'animated duration-15'}>
                            {pageText.infoCards.map((props, index) => (
                                <div className={'col-sm-4 mb-5 p-2 hover-expand hover-shadow-sm'} key={index}>
                                    <InfoCard {...props} />
                                </div>
                            ))}
                        </ScrollToShow>
                    </div>
                    <div className={'d-none d-sm-flex'}>
                        <ScrollToShow addClasses={'slide-in-left show'} distributeClasses={'animated duration-15'} distributeSimultaneously={0.32}>
                            {pageText.infoCards.map((props, index) => (
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

export default Projects;
