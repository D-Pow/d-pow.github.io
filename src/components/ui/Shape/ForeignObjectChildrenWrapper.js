import React from 'react';
import PropTypes from 'prop-types';
import { getRefPropType } from 'utils/ReactParsing';

function ForeignObjectChildrenWrapper({
    className,
    style,
    wrapperOuterRef,
    wrapperInnerRef,
    children
}) {
    return (
        <div className={`text-center d-flex h-100 w-100 ${className}`} ref={wrapperOuterRef}>
            <div
                className={'m-auto'}
                ref={wrapperInnerRef}
                style={style}
            >
                {children}
            </div>
        </div>
    );
}

ForeignObjectChildrenWrapper.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    wrapperOuterRef: getRefPropType(true),
    wrapperInnerRef: getRefPropType(true),
    children: PropTypes.node
};

ForeignObjectChildrenWrapper.defaultProps = {
    className: '',
    style: {}
};

export default ForeignObjectChildrenWrapper;
