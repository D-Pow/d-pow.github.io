import React from 'react';
import PropTypes from 'prop-types';
import AtomSpinner from './AtomSpinner';

function SpinnerAtom({ className, fullScreen, show }) {
    if (!show) {
        return <React.Fragment />;
    }

    return (
        <div className={`bg-dark absolute-center ${fullScreen ? 'full-screen' : ''} ${className}`}>
            <div className={'m-auto'}>
                <AtomSpinner />
            </div>
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
