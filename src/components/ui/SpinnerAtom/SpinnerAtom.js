import React from 'react';
import PropTypes from 'prop-types';
import AtomSpinner from './AtomSpinner';

function SpinnerAtom({ className, fullScreen, show }) {
    const classes = [
        'bg-dark',
        'absolute-center',
        'animated',
        'fade',
        'duration-8'
    ];

    if (fullScreen) {
        classes.push('full-screen');
    }

    if (className) {
        classes.push(className);
    }

    if (show) {
        classes.push('show');
    }

    return (
        <div className={classes.join(' ')}>
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
