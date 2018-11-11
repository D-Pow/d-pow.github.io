import React from 'react';
//import reactLogo from 'assets/react_logo.svg';
import 'styles/Footer.css';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <span>
                    <h4 className={'inline-title'}>Made with React 16</h4>
                    {
                        //<img src={reactLogo} className="react-logo" alt="logo" />
                    }
                </span>
            </footer>
        );
    }
}

export default Footer;
