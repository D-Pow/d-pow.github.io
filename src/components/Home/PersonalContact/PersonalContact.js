import React from 'react';
import ScrollToShow from 'components/ui/ScrollToShow';

function PersonalContact(props) {
    return (
        <div className={'mb-5'}>
            <ScrollToShow addClasses={'show'} distributeClasses={'fade-in duration-20'}>
                <h1 className={'p-5 mb-5 bg-light'}>Personal Contact</h1>
            </ScrollToShow>
        </div>
    );
}

export default PersonalContact;
