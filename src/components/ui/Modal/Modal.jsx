import { useState } from 'react';
import PropTypes from 'prop-types';

import ReactPortal from '@/components/ui/ReactPortal';
import { useRootClose, useBlockDocumentScrolling } from '@/utils/Hooks';

function Modal({
    title,
    children,
    footer,
    useGridForBody,
    useGridForFooter,
    sizeCompact,
    sizeMax,
    preventDocumentScrolling,
    show,
    showCloseButton,
    onClose,
    portalId,
}) {
    const [ hideMomentarily, setHideMomentarily ] = useState(false);
    const [ rootWasClosed, resetRootClosed ] = useRootClose(
        { attribute: 'class', value: 'modal-content' },
        { attribute: 'class', value: 'modal fade' },
    );

    const handleClose = () => {
        // The fade-(in|out) animation relies on the modal being rendered at full screen width/height and then
        // 'show' added/removed accordingly.
        // Because of this, if we simply use the `props.show` value in computing `displayCls` below,
        // the modal will be removed without showing any animation.
        // In order for the user to see the fade-out animation, the 'show' className must be
        // removed *before* the modal is actually removed; thus, delay the actual removal of the
        // modal until after 'show' is removed (i.e. before the size is set to 0).
        setHideMomentarily(true);

        setTimeout(() => {
            onClose();
            setHideMomentarily(false);
        }, 500);
    };

    if (rootWasClosed) {
        // reset keyDown/clickPath so that previous values aren't used if the modal is closed and then re-opened
        resetRootClosed();

        if (show) {
            handleClose();
        }
    }

    useBlockDocumentScrolling(
        () => (show && preventDocumentScrolling),
    );

    const displayCls = (show && !hideMomentarily) ? 'show' : '';
    const sizeStyle = show ? '' : '0%';
    // Default title text to be a header.
    // Clear the margin since that's handled by .modal-title
    const renderedTitle = typeof title === typeof ''
        ? <h4 className={'margin-clear'}>{title}</h4>
        : title;

    const renderedModal = (
        <div className={`modal fade d-flex flex-center ${displayCls}`}
            style={{
                // Bootstrap's CSS for the modal backdrop's opacity and size doesn't work correctly. Override it here
                background: 'rgba(0, 0, 0, 0.7)',
                width: sizeStyle,
                height: sizeStyle,
            }}
        >
            <div className={'d-block w-100'}>
                <div className={`${sizeCompact ? 'modal-dialog' : ''} modal-dialog-centered flex-center`}>
                    <div
                        className={'modal-content overflow-auto'}
                        style={{
                            [sizeMax ? 'width' : 'maxWidth']: '90vw',
                            [sizeMax ? 'height' : 'maxHeight']: '90vh',
                        }}
                    >

                        <div className={'modal-header'}>
                            <div className={'modal-title'}>
                                {renderedTitle}
                            </div>
                            {showCloseButton && (
                                <button className={'close'} onClick={handleClose}>
                                    <span>&times;</span>
                                </button>
                            )}
                        </div>

                        <div className={'modal-body'}>
                            <div className={useGridForBody ? 'container-fluid h-100' : ''}>
                                {children}
                            </div>
                        </div>

                        {footer && (
                            <div className={'modal-footer'}>
                                <div className={useGridForFooter ? 'container-fluid h-100' : ''}>
                                    {footer}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );

    if (portalId) {
        return (
            <ReactPortal
                // Only add wrapper-element ID if it was specified by the parent.
                // If `true` were passed, then use the default UUID-generation logic within `ReactPortal` component.
                wrapperId={portalId === true ? undefined : portalId}
            >
                {renderedModal}
            </ReactPortal>
        );
    }

    return renderedModal;
}

Modal.propTypes = {
    title: PropTypes.node,
    children: PropTypes.node,
    footer: PropTypes.node,
    useGridForBody: PropTypes.bool,
    useGridForFooter: PropTypes.bool,
    sizeCompact: PropTypes.bool,
    sizeMax: PropTypes.bool,
    preventDocumentScrolling: PropTypes.bool,
    show: PropTypes.bool,
    showCloseButton: PropTypes.bool,
    onClose: PropTypes.func,
    portalId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
};

Modal.defaultProps = {
    title: '',
    children: '',
    footer: '',
    useGridForBody: true,
    useGridForFooter: true,
    sizeCompact: false,
    sizeMax: false,
    preventDocumentScrolling: true,
    show: false,
    showCloseButton: true,
    onClose: () => {},
};

export default Modal;
