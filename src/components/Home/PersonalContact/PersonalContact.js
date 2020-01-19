import React, { useState } from 'react';
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

    const contactMethods = [
        <Link href={LINKS.LinkedIn}><Image className={'w-25 mb-4'} image={'linkedin_logo.svg'} /></Link>,
        <Link href={LINKS.GitHub}><Image className={'w-25 mb-4'} image={'github_logo.svg'} /></Link>,
        <button className={'btn btn-primary px-4 py-3 mx-auto'} onClick={showContactModal}>
            <h5 className={'margin-clear'}>Contact me!</h5>
        </button>
    ];

    const [ shownChildren, triggerShowChildren ] = useTimedArrayToggle(contactMethods.length, 250);

    const handleShowContactLinksClick = () => {
        triggerShowChildren();
    };

    const clicked = shownChildren.some(shouldShow => shouldShow); // if clicked, at least one child will be true
    const animationCls = 'animated duration-5';
    const animationShowCls = 'flip-x show';
    const hideCls = 'd-none';
    const headerStyleCls = 'border border-primary border-medium rounded mx-auto p-4 width-fit hover-invert-bg-light';
    const headerCls = `${headerStyleCls} ${animationCls} ${clicked ? hideCls : animationShowCls}`;
    const contactLinkCls = index => `${animationCls} ${shownChildren[index] ? animationShowCls : hideCls}`;

    const renderedContactMethods = contactMethods.map((renderedContactMethod, index) => {
        return (
            <div className={contactLinkCls(index)} key={index}>
                <div className={'row'}>
                    <div className={'col mx-auto'}>
                        {renderedContactMethod}
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className={'mb-5'}>
            <ScrollToShow addClasses={'show'} distributeClasses={'animated fade duration-20'} distributeSimultaneously={0.5}>
                <h1 className={'p-5'}>Personal Contact</h1>
                <div className={'container'}>
                    <div className={'row justify-content-sm-center'}>
                        <div className={'col-sm-6 my-5'}>
                            <h5 className={headerCls} onClick={handleShowContactLinksClick}>
                                Interested in finding out more?
                            </h5>
                            <div>
                                {renderedContactMethods}
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollToShow>

            <ContactModal show={showModal} handleClose={handleCloseModal} />
        </div>
    );
}

export default PersonalContact;
