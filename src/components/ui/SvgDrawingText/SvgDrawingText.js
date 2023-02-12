import { memo } from 'react';
import PropTypes from 'prop-types';

import { isSafariBrowser } from '@/utils/BrowserIdentification';
import { objEquals } from '@/utils/Objects';
import SvgDrawingTestStyles from '@/styles/Animations/Svg/DrawingText.scss';

const { strokeDasharrayLengthForFontSize1em } = SvgDrawingTestStyles;

function SvgDrawingText({
    className,
    fontSizeEm,
    animationDurationSeconds,
    textElemProps,
    style,
    children,
}) {
    // override default props with those specified by user
    // but ensure that the default props are set if user didn't specify them all
    const elemProps = Object.assign({}, SvgDrawingText.defaultProps.textElemProps, textElemProps);
    // again, Safari is the new IE. Add a hacky fix to make text-outline-drawing work on Safari
    const safariModifier = isSafariBrowser() ? 12 : 1;
    const strokeDasharrayLength = Math.ceil(fontSizeEm * safariModifier * Number(strokeDasharrayLengthForFontSize1em));
    // make draw-outline and fill-fade-in animations end at the same time
    // fill-fade-in will wait until draw-outline is 2/3 complete before beginning
    const fillFadeInDuration = animationDurationSeconds / 3;
    const fillFadeInDelay = animationDurationSeconds - fillFadeInDuration;
    const elemStyle = {
        ...style,
        ['--stroke-dasharray-length']: strokeDasharrayLength,
        fontSize: `${fontSizeEm}em`, // stroke-dasharray length depends on font-size, so ensure they match
        animationDuration: `${animationDurationSeconds}s, ${fillFadeInDuration}s`,
        animationDelay: `0s, ${fillFadeInDelay}s`,
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
    children: PropTypes.node,
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
    },
};

const MemoizedSvgDrawingText = memo(SvgDrawingText, objEquals);

MemoizedSvgDrawingText.propTypes = SvgDrawingText.propTypes;
MemoizedSvgDrawingText.defaultProps = SvgDrawingText.defaultProps;

export default MemoizedSvgDrawingText;
