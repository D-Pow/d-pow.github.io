import React from 'react';
import PropTypes from 'prop-types';
import { strokeDasharrayLengthForFontSize1em } from 'styles/Animations/Svg/DrawingText.scss';

function SvgDrawingText({
        className,
        fontSizeEm,
        animationDurationSeconds,
        textElemProps,
        style,
        children
    }) {
    // override default props with those specified by user
    // but ensure that the default props are set if user didn't specify them all
    const elemProps = Object.assign({}, SvgDrawingText.defaultProps.textElemProps, textElemProps);
    const strokeDasharrayLength = Math.ceil(fontSizeEm * Number(strokeDasharrayLengthForFontSize1em));
    // make draw-outline and fill-fade-in animations end at the same time
    // fill-fade-in will wait until draw-outline is 2/3 complete before beginning
    const fillFadeInDuration = animationDurationSeconds / 3;
    const fillFadeInDelay = animationDurationSeconds - fillFadeInDuration;
    const elemStyle = {
        ...style,
        ['--stroke-dasharray-length']: strokeDasharrayLength,
        fontSize: `${fontSizeEm}em`, // stroke-dasharray length depends on font-size, so ensure they match
        animationDuration: `${animationDurationSeconds}s, ${fillFadeInDuration}s`,
        animationDelay: `0s, ${fillFadeInDelay}s`
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
    animationDurationSeconds: PropTypes.number,
    style: PropTypes.object,
    textElemProps: PropTypes.object,
    children: PropTypes.oneOfType([ PropTypes.node, PropTypes.arrayOf(PropTypes.node) ])
};

SvgDrawingText.defaultProps = {
    className: '',
    fontSizeEm: 1,
    animationDurationSeconds: 3,
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
