import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AtomSpinner from './AtomSpinner';
import { resetWindowScroll } from 'utils/Functions';

function SpinnerAtom({ className, fullScreen, show, preventScrolling, useSvg }) {
    const classes = [
        'bg-dark',
        'absolute-center',
        'position-fixed',
        'animated',
        'fade-out-disappear',
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

    useEffect(() => {
        // Don't add scroll handler if not shown.
        // React calls cleanup functions upon both component unmount
        // and component re-render. Thus, the re-render from changing
        // the `show` prop will cause the cleanup function to be called,
        // removing the scroll handler.
        if (show && preventScrolling) {
            window.addEventListener('scroll', resetWindowScroll);
        }

        return () => {
            window.removeEventListener('scroll', resetWindowScroll);
        };
    }, [show, preventScrolling]);

    return (
        <div className={classes.join(' ')}>
            <div className={'m-auto'}>
                <AtomSpinner svg={useSvg} />
            </div>
        </div>
    );
}

SpinnerAtom.propTypes = {
    className: PropTypes.string,
    fullScreen: PropTypes.bool,
    show: PropTypes.bool,
    preventScrolling: PropTypes.bool,
    useSvg: PropTypes.bool
};

SpinnerAtom.defaultProps = {
    className: '',
    fullScreen: true,
    show: false,
    preventScrolling: false,
    useSvg: false
};

export default SpinnerAtom;
