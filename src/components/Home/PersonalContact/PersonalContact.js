import React, { useState } from 'react';
import ScrollToShow from 'components/ui/ScrollToShow';
import ContactModal from 'components/ui/ContactModal';
import { useHover } from 'utils/Hooks';

function PersonalContact(props) {
    const [ showModal, setShowModal ] = useState(false);
    const [ hoverRef, isHovered ] = useHover();

    const showContactModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const animationCls = 'animated duration-5';
    const animationShowCls = 'flip-x show';
    const headerCls = `border border-primary border-medium rounded margin-center p-4 width-fit ${animationCls} ${isHovered ? '' : animationShowCls}`;
    const btnCls = `btn btn-primary ${animationCls} ${isHovered ? animationShowCls : ''}`;

    return (
        <div className={'mb-5'}>
            <ScrollToShow addClasses={'show'} distributeClasses={'fade-in duration-20'}>
                <h1 className={'p-5 mb-5 bg-light'}>Personal Contact</h1>
            </ScrollToShow>

            <div className={'container'}>
                <div className={'row justify-content-sm-center'}>
                    <div className={'col-sm-6 my-5'}>
                        <div className={'absolute-center'}>
                            <h5 className={headerCls} ref={hoverRef}>
                                Interested in finding out more?
                            </h5>
                        </div>
                        <div className={'absolute-center'}>
                            <button className={btnCls} onClick={showContactModal}>Contact me!</button>
                        </div>
                    </div>
                </div>
            </div>

            <ContactModal show={showModal} handleClose={handleCloseModal} />
        </div>
    );
}

export default PersonalContact;
