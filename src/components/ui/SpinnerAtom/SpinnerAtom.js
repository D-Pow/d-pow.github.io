import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/ui/Image';

function SpinnerAtom({ className, fullScreen, show }) {
    if (!show) {
        return null;
    }

    return (
        <div className={`bg-dark d-flex ${className} ${fullScreen ? 'full-screen' : ''}`}>
            <Image
                className={'m-auto'}
                image={'atom_spinner.svg'}
            />
        </div>
    );
}

SpinnerAtom.propTypes = {
    className: PropTypes.string,
    fullScreen: PropTypes.bool,
    show: PropTypes.bool
};

SpinnerAtom.defaultProps = {
    className: '',
    fullScreen: true,
    show: false
};

export default SpinnerAtom;
