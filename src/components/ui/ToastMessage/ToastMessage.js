import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import '@/styles/ToastMessage.scss';

function ToastMessage(props) {
    function handleClose() {
        props.onClose();
    }

    useEffect(() => {
        if (props.hideAfterDelay) {
            setTimeout(() => {
                handleClose();
            }, props.hideAfterDelay);
        }
    }, [ props.hideAfterDelay ]);

    if (!props.show) {
        return '';
    }

    const renderedHeader = props.header
        ? (
            <div className={'toast-header'}>
                {props.header}
                <button
                    className={'ml-2 mb-1 close'}
                    style={{
                        position: 'absolute',
                        right: '8px'
                    }}
                    onClick={handleClose}
                >
                    <span>&times;</span>
                </button>
            </div>
        )
        : '';
    const style = props.float === ToastMessage.Positions.CENTER
        ? {
            margin: 'auto',
            [ToastMessage.Positions.LEFT]: '0',
            [ToastMessage.Positions.RIGHT]: '0'
        }
        : {
            [props.float]: '5px'
        };

    return (
        <div
            className={'toast toast-message show slide-in-top'}
            style={style}
        >
            {renderedHeader}
            <div className={'toast-body'}>
                {props.children}
            </div>
        </div>
    );
}

ToastMessage.Positions = {
    LEFT: 'left',
    RIGHT: 'right',
    CENTER: 'center'
};

ToastMessage.propTypes = {
    children: PropTypes.node,
    float: PropTypes.oneOf(Object.values(ToastMessage.Positions)),
    header: PropTypes.node,
    hideAfterDelay: PropTypes.number,
    show: PropTypes.bool,
    onClose: PropTypes.func
};

ToastMessage.defaultProps = {
    float: ToastMessage.Positions.LEFT,
    onClose: () => {}
};

export default ToastMessage;
