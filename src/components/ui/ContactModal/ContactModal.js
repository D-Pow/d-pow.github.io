import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/ui/Modal';

function ContactModal({ show, handleClose }) {
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ hasClosedAfterSubmitting, setHasClosedAfterSubmitting ] = useState(false);
    const [ nameInput, setNameInput ] = useState('');
    const [ emailInput, setEmailInput ] = useState('');
    const [ messageInput, setMessageInput ] = useState('');

    const handleTyping = setterFn => {
        return event => {
            setterFn(event.target.value);
        }
    };
    const handleSubmit = () => {
        setHasSubmitted(true);
    };
    const handleCloseModal = () => {
        if (hasSubmitted) {
            setHasClosedAfterSubmitting(true);
        }

        handleClose();
    };

    let modalBody;
    if (hasClosedAfterSubmitting) {
        modalBody = (
            <h6>Didn't you already contact me?</h6>
        );
    } else if (hasSubmitted) {
        modalBody = (
            <React.Fragment>
                <h5>Thank you!</h5>
                <p>I will be in contact with you shortly</p>
            </React.Fragment>
        );
    } else {
        modalBody = (
            <div className={'form-group'}>
                <input className={'form-control bg-secondary mb-2 text-white'} type={'text'} placeholder={'Name'} value={nameInput} onChange={handleTyping(setNameInput)} />
                <input className={'form-control bg-secondary mb-2 text-white'} type={'email'} placeholder={'Email'} value={emailInput} onChange={handleTyping(setEmailInput)} />
                <textarea className={'form-control bg-secondary text-white'} rows={3} placeholder={'What\'s on your mind?'} value={messageInput} onChange={handleTyping(setMessageInput)} />
            </div>
        );
    }

    const modalFooter = hasSubmitted ? '' : (
        <div className={'text-center'}>
            <button className={'btn btn-primary'} onClick={handleSubmit}>Send</button>
        </div>
    );

    return (
        <Modal
            title={'Get in touch'}
            footer={modalFooter}
            useGridForFooter={true}
            show={show}
            onClose={handleCloseModal}
        >
            {modalBody}
        </Modal>
    );
}

ContactModal.propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func
};

ContactModal.defaultProps = {
    show: false,
    handleClose: () => {}
};

export default ContactModal;
