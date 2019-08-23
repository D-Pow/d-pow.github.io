import React, { useState } from 'react';
import ScrollToShow from 'components/ui/ScrollToShow';
import ContactModal from 'components/ui/ContactModal';

function PersonalContact(props) {
    const [ showModal, setShowModal ] = useState(false);

    const showContactModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className={'mb-5'}>
            <ScrollToShow addClasses={'show'} distributeClasses={'fade-in duration-20'}>
                <h1 className={'p-5 mb-5 bg-light'}>Personal Contact</h1>
            </ScrollToShow>

            <h5 className={'p-3'}>
                Interested in finding out more?
            </h5>
            <button className={'btn btn-primary'} onClick={showContactModal}>Contact me!</button>

            <ContactModal show={showModal} handleClose={handleCloseModal} />
        </div>
    );
}

export default PersonalContact;
