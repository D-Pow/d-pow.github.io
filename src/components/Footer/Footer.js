import React from 'react';
import Image from 'components/ui/Image';
import 'styles/Footer.scss';

class Footer extends React.Component {
    renderReactLogo() {
        return (
            <span>
                <h4 className={'footer-title'}>Made with React 16</h4>
                <Image className={'react-logo'} image={'react_logo.svg'} fillParent={false} />
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
