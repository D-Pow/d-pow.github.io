import React from 'react';
import { EASTER_EGG } from 'utils/CommonRenders';
import 'styles/Footer.scss';

function Footer(props) {
    return (
        <footer className={'footer-container w-100'}>
            <div className={'footer-title'}>There are 3 easter eggs on this site.</div>
            <div className={'footer-title'}>Can you find them all? {EASTER_EGG}</div>
        </footer>
    );
}

export default Footer;
