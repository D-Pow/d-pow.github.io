import React from 'react';
import PropTypes from 'prop-types';

function FlipCard(props) {
    const showCls = `flip-${props.axis}-full`;
    const hideCls = 'd-none';

    const renderedDefaultSide = (
        <div className={`${props.durationCls} ${props.isFlipped ? hideCls : showCls}`}>
            {props.showDefault}
        </div>
    );
    const renderedClickSide = (
        <div className={`${props.durationCls} ${props.isFlipped ? showCls : hideCls}`}>
            {props.showOnClick}
        </div>
    );

    return (
        <div className={props.className}>
            {renderedDefaultSide}
            {renderedClickSide}
        </div>
    );
}

FlipCard.AXES = {
    X: 'x',
    Y: 'y'
};

FlipCard.propTypes = {
    axis: PropTypes.oneOf(Object.values(FlipCard.AXES)),
    className: PropTypes.string,
    durationCls: PropTypes.string,
    isFlipped: PropTypes.bool,
    showDefault: PropTypes.node,
    showOnClick: PropTypes.node
};

FlipCard.defaultProps = {
    axis: FlipCard.AXES.X,
    className: '',
    durationCls: 'duration-5',
    isFlipped: false
};

export default FlipCard;
