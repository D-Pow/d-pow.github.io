import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/ui/Modal';

class ContactModal extends React.Component {
    pageText = {
        inputs: {
            placeholder: {
                name: 'Name',
                email: 'Email',
                message: 'What\'s on your mind?'
            }
        }
    };

    state = {
        hasSubmitted: false,
        hasClosedAfterSubmitting: false,
        nameInput: '',
        emailInput: '',
        messageInput: ''
    };

    handleTyping = field => {
        return event => {
            this.setState({ [`${field}Input`]: event.target.value });
        }
    };

    handleSubmit = () => {
        this.setState({ hasSubmitted: true });
    };

    handleCloseModal = () => {
        if (this.state.hasSubmitted) {
            this.setState({ hasClosedAfterSubmitting: true });
        }

        this.props.handleClose();
    };

    render() {
        const { placeholder } = this.pageText.inputs;
        let modalBody;

        if (this.state.hasClosedAfterSubmitting) {
            modalBody = (
                <h6>Didn't you already contact me?</h6>
            );
        } else if (this.state.hasSubmitted) {
            modalBody = (
                <React.Fragment>
                    <h5>Thank you!</h5>
                    <p>I will be in contact with you shortly</p>
                </React.Fragment>
            );
        } else {
            modalBody = (
                <div className={'form-group'}>
                    <input className={'form-control bg-secondary mb-2 text-white'} type={'text'} placeholder={placeholder.name} value={this.state.nameInput} onChange={this.handleTyping('name')} />
                    <input className={'form-control bg-secondary mb-2 text-white'} type={'email'} placeholder={placeholder.email} value={this.state.emailInput} onChange={this.handleTyping('email')} />
                    <textarea className={'form-control bg-secondary text-white'} rows={3} placeholder={placeholder.message} value={this.state.messageInput} onChange={this.handleTyping('message')} />
                </div>
            );
        }

        const modalFooter = this.state.hasSubmitted ? '' : (
            <div className={'text-center'}>
                <button className={'btn btn-primary'} onClick={this.handleSubmit}>Send</button>
            </div>
        );

        return (
            <Modal
                title={'Get in touch'}
                footer={modalFooter}
                useGridForFooter={true}
                show={this.props.show}
                onClose={this.handleCloseModal}
            >
                {modalBody}
            </Modal>
        );
    }
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
