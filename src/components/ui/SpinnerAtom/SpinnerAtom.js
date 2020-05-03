import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AtomSpinner from './AtomSpinner';
import { getDurationTimeMsFromClassName, setDocumentScrolling } from 'utils/Functions';

function SpinnerAtom({
    className,
    fullScreen,
    show,
    preventScrolling,
    onClose,
    onUnmount,
    numElectrons,
    electronColors
}) {
    const [ showMomentarily, setShowMomentarily ] = useState(false);
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

    const cls = classes.join(' ');
    const fadeOutDelay = getDurationTimeMsFromClassName(cls) + 200; // slightly longer time than .duration-XX class

    useEffect(() => {
        /**
         * Don't return a cleanup function to handle activating scrolling.
         *
         * React calls cleanup functions upon both component unmount
         * and component re-render. Also, the App component uses the Spinner
         * as both React.Suspense.fallback and within the rendered app.
         *
         * As such, the re-render between Suspense and in-app rendering would
         * cause the cleanup function to be called, removing the scroll handler.
         * Thus, handle the cleanup manually.
         */
        if (preventScrolling) {
            if (show) {
                setDocumentScrolling(false);
            } else {
                setDocumentScrolling();
            }
        } else {
            setDocumentScrolling()
        }
    }, [show, preventScrolling]);

    useEffect(() => {
        /**
         * Similar to how <Modal/> waits for a bit before removing the .show
         * class so that the fade-out animation can play, wait a bit before
         * removing the spinner so its fade-out animation can play.
         * Afterwards, don't render the spinner at all so that its animation
         * doesn't take up browser resources while hidden.
         */
        const wasJustClosed = !show && showMomentarily;

        if (show) {
            setShowMomentarily(true); // reset wait-for-fade-out flag
        }

        if (wasJustClosed) {
            setTimeout(() => {
                setShowMomentarily(false);
                onUnmount();
            }, fadeOutDelay);
            onClose();
        }
    }, [show, fadeOutDelay]);

    return (show || showMomentarily) ? (
        <div className={cls}>
            <div className={'m-auto'}>
                <AtomSpinner numElectrons={numElectrons} electronColors={electronColors} />
            </div>
        </div>
    ) : null;
}

SpinnerAtom.propTypes = {
    className: PropTypes.string,
    fullScreen: PropTypes.bool,
    show: PropTypes.bool,
    preventScrolling: PropTypes.bool,

    // handler for when the spinner is first closed
    onClose: PropTypes.func,

    // handler for when the spinner is fully removed from view (after animation)
    onUnmount: PropTypes.func,

    ...AtomSpinner.propTypes
};

SpinnerAtom.defaultProps = {
    className: '',
    fullScreen: true,
    show: false,
    preventScrolling: false,
    onClose: () => {},
    onUnmount: () => {}
};

export default SpinnerAtom;
