import React from 'react';
import PropTypes from 'prop-types';
import { strokeDasharrayLengthForFontSize1em } from 'styles/Animations/Svg/DrawingText.scss';

function SvgDrawingText({
        className,
        fontSizeEm,
        textElemProps,
        style,
        children
    }) {
    // override default props with those specified by user
    // but ensure that the default props are set if user didn't specify them all
    const elemProps = Object.assign({}, SvgDrawingText.defaultProps.textElemProps, textElemProps);
    const strokeDasharrayLength = Math.ceil(fontSizeEm * Number(strokeDasharrayLengthForFontSize1em));
    // override user styles with those that depend on font-size
    const elemStyle = {
        ...style,
        ['--stroke-dasharray-length']: strokeDasharrayLength,
        fontSize: `${fontSizeEm}em`
    };

    return (
        <text
            {...elemProps}
            className={'draw-text-and-fill ' + className}
            style={elemStyle}
        >
            {children}
        </text>
    );
}

SvgDrawingText.propTypes = {
    className: PropTypes.string,
    fontSizeEm: PropTypes.number,
    style: PropTypes.object,
    textElemProps: PropTypes.object,
    children: PropTypes.oneOfType([ PropTypes.node, PropTypes.arrayOf(PropTypes.node) ])
};

SvgDrawingText.defaultProps = {
    className: '',
    fontSizeEm: 1,
    style: {},
    textElemProps: {
        fill: 'white',
        stroke: 'white',
        strokeWidth: 0.5,
        x: '50%',
        y: '50%',
        dominantBaseline: 'middle', // y-axis centering
        textAnchor: 'middle', // x-axis centering
    }
};

export default SvgDrawingText;
