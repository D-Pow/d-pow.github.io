import { useState } from 'react';
import PropTypes from 'prop-types';

import ScrollToShow from '@/components/ui/ScrollToShow';
import ContactModal from '@/components/ui/ContactModal';
import Image from '@/components/ui/Image';
import Anchor from '@/components/ui/Anchor';
import { LINKS } from '@/utils/Constants';
import { getGridBreakpoints } from '@/utils/Scss';
import { useTimedArrayToggle } from '@/utils/Hooks';
import { ReactComponent as PdfIcon } from '@/assets/pdf-icon.svg';


function PersonalContact(props) {
    const [ showModal, setShowModal ] = useState(false);

    const showContactModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const contactLinks = [
        <Anchor href={LINKS.LinkedIn} key={LINKS.LinkedIn}>
            <Image className={'w-60 mb-4'} image={'linkedin_logo.svg'} />
        </Anchor>,
        <Anchor href={LINKS.GitHub} key={LINKS.GitHub}>
            <Image className={'w-60 mb-4'} image={'github_logo.svg'} />
        </Anchor>,
        <Anchor href={LINKS.ResumeFileViewer} underlineText={false} key={LINKS.ResumeFileViewer}>
            {/* <Image className={'w-60 mb-4'} image={'pdf-icon.svg'} /> */}
            <PdfIcon
                className={'w-60 mb4'}
                key={LINKS.ResumeFileViewer}
            >
                <text
                    x="2.65"
                    y="14.75"
                    style={{ fontSize: '0.15em' }}
                >
                    Resume
                </text>
            </PdfIcon>
        </Anchor>,
    ];

    const numChildrenToFlip = contactLinks.length + 1; // include 'contact me' modal-opening button
    const modalButtonShownChildrenIndex = contactLinks.length; // button will be last child to flip in timed array toggle
    const [ shownChildren, triggerShowChildren ] = useTimedArrayToggle(numChildrenToFlip, 250);

    const handleAfterTitleAnimation = () => { // show children after the title has displayed
        triggerShowChildren();
    };

    const isMobileScreenSize = window.innerWidth <= getGridBreakpoints().sm;
    const animationCls = isMobileScreenSize ? 'slide-in-bottom' : 'flip-x';

    const getContactMethodCls = index => `animated duration-5 ${shownChildren[index] ? `show ${animationCls}` : ''}`;

    const renderedContactLinks = contactLinks.map((renderedContactLink, shownChildrenIndex) => {
        return (
            <div
                // Make links appear on individual rows on xs screen sizes, 2 per row on small screens,
                // and all on one row for larger ones
                className={`col-8 col-sm-6 col-md-${Math.floor(12 / contactLinks.length)}`}
                key={shownChildrenIndex}
            >
                <div className={getContactMethodCls(shownChildrenIndex)}>
                    {renderedContactLink}
                </div>
            </div>
        );
    });
    const renderedModalButton = (
        <div className={`col ${getContactMethodCls(modalButtonShownChildrenIndex)}`}>
            <button
                className={'btn border border-primary border-medium rounded p-4 hover-invert-text-bg-colors duration-3'}
                onClick={showContactModal}
            >
                <h5 className={'margin-clear'}>
                    Interested in finding out more? Contact me!
                </h5>
            </button>
        </div>
    );

    return (
        <section id={'personal-contact'} className={'mb-5 ' + props.className}>
            <ScrollToShow
                addClasses={'show'}
                distributeClassesBeforeShow={props.titleAnimationCls}
                onAllChildrenShown={handleAfterTitleAnimation}
            >
                <h1 className={'p-5'}>Personal Contact</h1>
            </ScrollToShow>

            <div className={'container'}>
                <div className={'row flex-center mb-5'}>
                    <div className={'col-12 col-sm-10 col-md-11 col-lg-8'}>
                        <div className={'row flex-center'}>
                            {renderedContactLinks}
                        </div>
                    </div>
                </div>
                <div className={'row flex-center'}>
                    {renderedModalButton}
                </div>
            </div>

            <ContactModal show={showModal} onClose={handleCloseModal} />
        </section>
    );
}

PersonalContact.propTypes = {
    className: PropTypes.string,
    titleAnimationCls: PropTypes.string,
};

PersonalContact.defaultProps = {
    className: '',
    titleAnimationCls: '',
};

export default PersonalContact;
