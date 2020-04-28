import React from 'react';
import PropTypes from 'prop-types';
import { strokeDasharrayLengthForFontSize1em } from 'styles/Animations/Svg/DrawingText.scss';

function SvgDrawingText({
        className,
        fontSizeEm,
        fillColor,
        strokeColor,
        x,
        y,
        textElemProps,
        children
    }) {
    const strokeDasharrayLength = Math.ceil(fontSizeEm * Number(strokeDasharrayLengthForFontSize1em));

    return (
        <text
            {...textElemProps}
            className={'draw-text-and-fill ' + className}
            x={x}
            y={y}
            dominantBaseline={'middle'} // y-axis centering
            textAnchor={'middle'} // x-axis centering
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={0.5}
            style={{
                ['--stroke-dasharray-length']: strokeDasharrayLength,
                fontSize: `${fontSizeEm}em`
            }}
        >
            {children}
        </text>
    );
}

SvgDrawingText.propTypes = {
    className: PropTypes.string,
    fontSizeEm: PropTypes.number,
    fillColor: PropTypes.string,
    strokeColor: PropTypes.string,
    x: PropTypes.string,
    y: PropTypes.string,
    textElemProps: PropTypes.object,
    children: PropTypes.oneOfType([ PropTypes.node, PropTypes.arrayOf(PropTypes.node) ])
};

SvgDrawingText.defaultProps = {
    className: '',
    fontSizeEm: 1,
    fillColor: 'white',
    strokeColor: 'white',
    x: '50%',
    y: '50%',
    textElemProps: {}
};

export default SvgDrawingText;
