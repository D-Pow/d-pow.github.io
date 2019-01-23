import React from 'react';
import reactLogo from 'assets/react_logo.svg';
import 'styles/Footer.scss';

class Footer extends React.Component {
    renderReactLogo() {
        return (
            <span>
                <h4 className={'footer-title'}>Made with React 16</h4>
                <img src={reactLogo} className="react-logo" alt="logo" />
            </span>
        );
    }

    render() {
        return (
            <footer className={'footer-container w-100'}>
                {this.renderReactLogo()}
            </footer>
        );
    }
}

export default Footer;
