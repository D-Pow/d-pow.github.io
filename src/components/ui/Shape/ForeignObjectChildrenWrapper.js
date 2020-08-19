import React from 'react';
import PropTypes from 'prop-types';
import { getRefPropType } from 'utils/ReactParsing';

function ForeignObjectChildrenWrapper({
    className,
    fontSize,
    constrainingElem,
    toResizeElem,
    children
}) {
    return (
        <div className={`text-center d-flex h-100 w-100 ${className}`} ref={constrainingElem}>
            <div
                className={'m-auto'}
                ref={toResizeElem}
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
    constrainingElem: getRefPropType(true),
    toResizeElem: getRefPropType(true),
    children: PropTypes.node
};

ForeignObjectChildrenWrapper.defaultProps = {
    className: ''
};

export default ForeignObjectChildrenWrapper;
