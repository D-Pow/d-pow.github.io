import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/ui/Modal';
import { CONTACT_FORM_URL, EMAIL_REGEX } from 'utils/Constants';

class ContactModal extends React.Component {
    pageText = {
        inputs: {
            placeholder: {
                name: 'Name',
                email: 'Email',
                message: 'What\'s on your mind?'
            },
            error: {
                name: 'Wait, what\'s your name again?',
                email: {
                    empty: 'Come on, don\'t be shy',
                    invalid: 'Hmm, I don\'t seem to recognize that email format. Try again?'
                },
                message: 'Please add a message (even if it\'s short)'
            }
        }
    };

    state = {
        hasSubmitted: false,
        hasClosedAfterSubmitting: false,
        nameInput: '',
        emailInput: '',
        messageInput: '',
        nameError: '',
        emailError: '',
        messageError: ''
    };

    handleTyping = field => {
        return event => {
            this.setState({
                [`${field}Input`]: event.target.value,
                [`${field}Error`]: ''
            });
        }
    };

    handleSubmit = () => {
        const { name, email, message } = this.pageText.inputs.error;
        const { nameInput, emailInput, messageInput } = this.state;

        const nameError = this.validateText(nameInput) ? '' : name;
        const emailError = emailInput
            ? (this.validateEmail(emailInput) ? '' : email.invalid)
            : email.empty;
        const messageError = this.validateText(messageInput) ? '' : message;

        const formIsValid = (nameError + emailError + messageError) === '';

        this.setState({
            nameError,
            emailError,
            messageError,
            hasSubmitted: formIsValid
        });

        if (formIsValid) {
            this.submitForm();
        }
    };

    handleCloseModal = () => {
        this.setState({
            nameError: '',
            emailError: '',
            messageError: ''
        });

        if (this.state.hasSubmitted) {
            this.setState({ hasClosedAfterSubmitting: true });
        }

        this.props.handleClose();
    };

    validateText(value) {
        return /[a-zA-Z0-9,./\\;:'"_\-!@#$%^&*+=]+/.test(value);
    }

    validateEmail(value) {
        return EMAIL_REGEX.test(value);
    }

    submitForm() {
        const { nameInput, emailInput, messageInput } = this.state;
        const formData = new FormData();

        formData.append('name', nameInput);
        formData.append('email', emailInput);
        formData.append('message', messageInput);

        fetch(CONTACT_FORM_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: formData
        });
    }

    renderErrorMessage(errorText) {
        return errorText ? <div className={'invalid-feedback d-inline'}>{errorText}</div> : '';
    }

    render() {
        const { placeholder } = this.pageText.inputs;
        const { nameError, emailError, messageError } = this.state;
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
                    <div className={'form-row mb-2'}>
                        <input className={'form-control bg-secondary text-white'} type={'text'} placeholder={placeholder.name} value={this.state.nameInput} onChange={this.handleTyping('name')} />
                        {this.renderErrorMessage(nameError)}
                    </div>
                    <div className={'form-row mb-2'}>
                        <input className={'form-control bg-secondary text-white'} type={'email'} placeholder={placeholder.email} value={this.state.emailInput} onChange={this.handleTyping('email')} />
                        {this.renderErrorMessage(emailError)}
                    </div>
                    <div className={'form-row'}>
                        <textarea className={'form-control bg-secondary text-white'} rows={3} placeholder={placeholder.message} value={this.state.messageInput} onChange={this.handleTyping('message')} />
                        {this.renderErrorMessage(messageError)}
                    </div>
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
