import React from 'react';
import PropTypes from 'prop-types';
import SvgDrawingText from 'components/ui/SvgDrawingText/index';
import { distributeValuesEvenlyBetween } from 'utils/Numbers';
import { objEquals } from 'utils/Objects';

function EvenlySpacedSkewedDrawingTexts({ textArray = [] }) {
    /*
     * Distribute text elements vertically such that there are equal
     * entries before/after the Y midpoint (y=50%), and closer to the center
     * than the edges.
     *
     * e.g. If 2 items, then 33% and 66%. If 3, then 25%, 50%, and 75%.
     */
    const evenlySpacedYValues = distributeValuesEvenlyBetween(0, 100, textArray.length);
    const centerX = '50%';

    return textArray.map((text, i) => (
        <SvgDrawingText
            className={'font-brush-script'}
            key={i}
            fontSizeEm={1.5}
            style={{ transform: 'skewY(-5deg)' }}
            textElemProps={{
                x: centerX,
                y: `${Math.round(evenlySpacedYValues[i])}%`
            }}
        >
            {text}
        </SvgDrawingText>
    ));
}

EvenlySpacedSkewedDrawingTexts.propTypes = {
    textArray: PropTypes.arrayOf(PropTypes.string)
};

export default React.memo(
    EvenlySpacedSkewedDrawingTexts,
    objEquals
);
