import { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '@/components/ui/Modal';
import SpinnerCircle from '@/components/ui/SpinnerCircle';
import { CONTACT_FORM_URL, EMAIL_REGEX } from '@/utils/Constants';
import { EasterEgg } from '@/utils/CommonRenders';

class ContactModal extends Component {
    pageText = {
        inputs: {
            placeholder: {
                name: 'Name',
                email: 'Email',
                message: 'What\'s on your mind?',
            },
            error: {
                name: 'Wait, what\'s your name again?',
                email: {
                    empty: 'Come on, don\'t be shy',
                    invalid: 'Hmm, I don\'t seem to recognize that email format. Try again?',
                },
                message: 'Please add a message (even if it\'s short)',
                formGeneric: 'Oops, something went wrong. Could you try again?',
                formNetwork: 'There was a network error. Are you sure you have an internet connection?',
            },
        },
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
        formError: '',
    };

    handleTyping = field => {
        return event => {
            this.setState({
                [`${field}Input`]: event.target.value,
                [`${field}Error`]: '',
                formError: '',
            });
        };
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
            formError: '',
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
            messageError,
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

        const handleAfterSubmit = (success, networkError = false) => {
            this.setState({ isLoading: false });

            if (success) {
                this.setState({ hasSubmitted: true, formError: '' });
            } else if (networkError) {
                this.setState({ formError: this.pageText.inputs.error.formNetwork });
            } else {
                this.setState({ formError: this.pageText.inputs.error.formGeneric });
            }
        };

        try {
            const response = await fetch(CONTACT_FORM_URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });
            const responseBody = await response.json(); // Check valid response from FormSpree's API

            handleAfterSubmit(response.ok && responseBody.ok);
        } catch (networkError) {
            handleAfterSubmit(false, true);
        }
    }

    renderErrorMessage(errorText) {
        return errorText ? <div className={'text-danger d-inline w-100'}>{errorText}</div> : '';
    }

    render() {
        const { placeholder } = this.pageText.inputs;
        const { nameError, emailError, messageError, formError } = this.state;
        let modalBody;

        if (this.state.hasClosedAfterSubmitting) {
            modalBody = (
                <>
                    <h5>Didn't you already contact me?</h5>
                    <EasterEgg />
                </>
            );
        } else if (this.state.hasSubmitted) {
            modalBody = (
                <>
                    <h5>Thank you!</h5>
                    <p>I will be in contact with you shortly</p>
                </>
            );
        } else {
            modalBody = (
                <div className={'form-group'}>
                    <div className={'form-row mb-2'}>
                        <input
                            className={'form-control bg-secondary text-white'}
                            type={'text'}
                            placeholder={placeholder.name}
                            value={this.state.nameInput}
                            onChange={this.handleTyping('name')}
                            aria-label={'name-input'}
                        />
                        {this.renderErrorMessage(nameError)}
                    </div>
                    <div className={'form-row mb-2'}>
                        <input
                            className={'form-control bg-secondary text-white'}
                            type={'email'}
                            placeholder={placeholder.email}
                            value={this.state.emailInput}
                            onChange={this.handleTyping('email')}
                            aria-label={'email-input'}
                        />
                        {this.renderErrorMessage(emailError)}
                    </div>
                    <div className={'form-row'}>
                        <textarea
                            className={'form-control bg-secondary text-white'}
                            rows={3}
                            placeholder={placeholder.message}
                            value={this.state.messageInput}
                            onChange={this.handleTyping('message')}
                            aria-label={'message-input'}
                        />
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
                show={this.props.show}
                onClose={this.handleCloseModal}
                sizeCompact
            >
                {modalBody}
            </Modal>
        );
    }
}

ContactModal.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
};

ContactModal.defaultProps = {
    show: false,
    onClose: () => {},
};

export default ContactModal;
