import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ScrollToShow from 'components/ui/ScrollToShow';
import ContactModal from 'components/ui/ContactModal';
import Image from 'components/ui/Image';
import Link from 'components/ui/Link';
import { LINKS } from 'utils/Constants';
import { useTimedArrayToggle } from 'utils/Hooks';

function PersonalContact(props) {
    const [ showModal, setShowModal ] = useState(false);

    const showContactModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const contactLinks = [
        <Link href={LINKS.LinkedIn}>
            <Image className={'w-60 mb-4'} image={'linkedin_logo.svg'} />
        </Link>,
        <Link href={LINKS.GitHub}>
            <Image className={'w-60 mb-4'} image={'github_logo.svg'} />
        </Link>
    ];

    const numChildrenToFlip = contactLinks.length + 1; // include 'contact me' modal-opening button
    const modalButtonShownChildrenIndex = contactLinks.length; // button will be last child to flip in timed array toggle
    const [ shownChildren, triggerShowChildren ] = useTimedArrayToggle(numChildrenToFlip, 250);

    const handleAfterTitleAnimation = () => { // show children after the title has displayed
        triggerShowChildren();
    };

    const getContactMethodCls = index => `animated duration-5 ${shownChildren[index] ? 'flip-x show' : ''}`;

    const renderedContactLinks = contactLinks.map((renderedContactLink, shownChildrenIndex) => {
        return (
            <div className={'col'} key={shownChildrenIndex}>
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
        <div className={'mb-5 ' + props.className}>
            <ScrollToShow
                addClasses={'show'}
                distributeClasses={props.titleAnimationCls}
                onAllChildrenShown={handleAfterTitleAnimation}
            >
                <h1 className={'p-5'}>Personal Contact</h1>
            </ScrollToShow>

            <div className={'container'}>
                <div className={'row justify-content-sm-center'}>
                    <div className={'col-sm-6 mb-5'}>
                        <div className={'row mb-4'}>
                            {renderedContactLinks}
                        </div>
                        <div className={'row'}>
                            {renderedModalButton}
                        </div>
                    </div>
                </div>
            </div>

            <ContactModal show={showModal} onClose={handleCloseModal} />
        </div>
    );
}

PersonalContact.propTypes = {
    className: PropTypes.string,
    titleAnimationCls: PropTypes.string
};

PersonalContact.defaultProps = {
    className: '',
    titleAnimationCls: ''
};

export default PersonalContact;
