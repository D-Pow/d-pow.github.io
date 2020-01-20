import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/ui/Modal';
import SpinnerCircle from 'components/ui/SpinnerCircle';
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
                message: 'Please add a message (even if it\'s short)',
                form: 'Oops, something went wrong. Could you try again?'
            }
        }
    };

    state = {
        hasSubmitted: false,
        hasClosedAfterSubmitting: false,
        isLoading: false,
        nameInput: '',
        emailInput: '',
        messageInput: '',
        nameError: '',
        emailError: '',
        messageError: '',
        formError: ''
    };

    handleTyping = field => {
        return event => {
            this.setState({
                [`${field}Input`]: event.target.value,
                [`${field}Error`]: '',
                formError: ''
            });
        }
    };

    handleSubmit = () => {
        const formIsValid = this.validateForm();

        if (formIsValid) {
            this.submitForm();
        }
    };

    handleCloseModal = () => {
        this.setState({
            nameError: '',
            emailError: '',
            messageError: '',
            formError: ''
        });

        if (this.state.hasSubmitted) {
            this.setState({ hasClosedAfterSubmitting: true });
        }

        this.props.onClose();
    };

    validateForm() {
        const { name, email, message } = this.pageText.inputs.error;
        const { nameInput, emailInput, messageInput } = this.state;

        const nameError = this.validateText(nameInput) ? '' : name;
        const emailError = emailInput
            ? (this.validateEmail(emailInput) ? '' : email.invalid)
            : email.empty;
        const messageError = this.validateText(messageInput) ? '' : message;

        this.setState({
            nameError,
            emailError,
            messageError
        });

        return (nameError + emailError + messageError) === '';
    }

    validateText(value) {
        // return /[a-zA-Z0-9,./\\?;:'"!@#$%^&*+=_\-()<>\[\]{}|]+/.test(value);
        return value.length > 0;
    }

    validateEmail(value) {
        return EMAIL_REGEX.test(value);
    }

    async submitForm() {
        this.setState({ isLoading: true });

        const { nameInput, emailInput, messageInput } = this.state;
        const formData = new FormData();

        formData.append('name', nameInput);
        formData.append('email', emailInput);
        formData.append('message', messageInput);

        const handleAfterSubmit = success => {
            this.setState({ isLoading: false });

            if (success) {
                this.setState({ hasSubmitted: true, formError: '' });
            } else {
                this.setState({ formError: this.pageText.inputs.error.form });
            }
        };

        try {
            const response = await fetch(CONTACT_FORM_URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json'
                },
                body: formData
            });

            handleAfterSubmit(response.ok);
        } catch(networkError) {
            handleAfterSubmit(false);
        }
    }

    renderErrorMessage(errorText) {
        return errorText ? <div className={'invalid-feedback d-inline'}>{errorText}</div> : '';
    }

    render() {
        const { placeholder } = this.pageText.inputs;
        const { nameError, emailError, messageError, formError } = this.state;
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
                <div className={'form-row mb-2'}>
                    {this.renderErrorMessage(formError)}
                </div>
                <button className={'btn btn-primary'} onClick={this.handleSubmit}>
                    {this.state.isLoading ? (
                        <SpinnerCircle show={true} />
                    ) : 'Send'}
                </button>
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
    onClose: PropTypes.func
};

ContactModal.defaultProps = {
    show: false,
    onClose: () => {}
};

export default ContactModal;
