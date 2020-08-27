import React from 'react';
import PropTypes from 'prop-types';
import { getRefPropType } from 'utils/ReactParsing';

function ForeignObjectChildrenWrapper({
    className,
    fontSize,
    wrapperOuterRef,
    wrapperInnerRef,
    children
}) {
    return (
        <div className={`text-center d-flex h-100 w-100 ${className}`} ref={wrapperOuterRef}>
            <div
                className={'m-auto'}
                ref={wrapperInnerRef}
                style={{
                    fontSize
                }}
            >
                {children}
            </div>
        </div>
    );
}

ForeignObjectChildrenWrapper.propTypes = {
    className: PropTypes.string,
    fontSize: PropTypes.string,
    wrapperOuterRef: getRefPropType(true),
    wrapperInnerRef: getRefPropType(true),
    children: PropTypes.node
};

ForeignObjectChildrenWrapper.defaultProps = {
    className: ''
};

export default ForeignObjectChildrenWrapper;
