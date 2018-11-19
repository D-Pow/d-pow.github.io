import React from 'react';
import reactLogo from 'assets/react_logo.svg';
import 'styles/Footer.css';

class Footer extends React.Component {
    renderReactLogo() {
        return (
            <span>
                <h4 className={'inline-title'}>Made with React 16</h4>
                <img src={reactLogo} className="react-logo" alt="logo" />
            </span>
        );
    }

    render() {
        return (
            <footer className={'blog-footer bg-light'}>
                {this.renderReactLogo()}
            </footer>
        );
    }
}

export default Footer;
