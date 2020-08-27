import React from 'react';
import PropTypes from 'prop-types';
import ForeignObjectChildrenWrapper from './ForeignObjectChildrenWrapper';
import { useDynamicFontSizeShrinking } from 'utils/Hooks';
import { isMobileBrowser } from 'utils/BrowserIdentification';
import { asNumber } from 'utils/Numbers';

function slightlySmallerThanLargestPossibleFontSize(
    fontSizePxStr,
    htmlChildren,
    {
        reduceByPx = 0,
        onlyOnMobile,
        onlyAtLength
    } = {}
) {
    let reduceFontSize = true;

    if (onlyOnMobile) {
        reduceFontSize = reduceFontSize && isMobileBrowser();
    }

    if (typeof onlyAtLength === typeof 0) {
        reduceFontSize = (
            reduceFontSize
            && (typeof htmlChildren === typeof '')
            && htmlChildren.length >= onlyAtLength
        );
    }

    return reduceFontSize ? `${asNumber(fontSizePxStr) - reduceByPx}px` : fontSizePxStr;
}

function ForeignObject({
    className,
    x,
    y,
    width,
    height,
    htmlChildren,
    htmlChildrenWrapperCls,
    htmlChildrenFontReductionOptions,
    foreignObjectBoundingClientRectInWindow,
}) {
    const [ constrainingElemRef, toResizeElemRef, fontSizePx ] = useDynamicFontSizeShrinking();
    const isUsingCustomResizeElement = typeof htmlChildren === typeof slightlySmallerThanLargestPossibleFontSize;
    // reduce font size slightly so text doesn't go all the way to the edge of the foreignObject
    const fontSizeStr = slightlySmallerThanLargestPossibleFontSize(fontSizePx, htmlChildren, htmlChildrenFontReductionOptions);
    const foreignObjectWrapperStyle = {
        fontSize: fontSizeStr
    };

    const renderedForeignObjectChildrenWrapper = isUsingCustomResizeElement
        ? (
            <ForeignObjectChildrenWrapper
                className={htmlChildrenWrapperCls}
                wrapperOuterRef={constrainingElemRef}
                style={foreignObjectWrapperStyle}
            >
                {htmlChildren(toResizeElemRef, foreignObjectBoundingClientRectInWindow)}
            </ForeignObjectChildrenWrapper>
        ) : (
            <ForeignObjectChildrenWrapper
                className={htmlChildrenWrapperCls}
                wrapperOuterRef={constrainingElemRef}
                wrapperInnerRef={toResizeElemRef}
                style={foreignObjectWrapperStyle}
            >
                {htmlChildren}
            </ForeignObjectChildrenWrapper>
        );

    /**
     * Since SVG doesn't support text-wrapping by default, use `foreignObject`
     * with nested `div`s to allow text-wrapping.
     * Also, center the text content by setting div wrapper's display to flex, making
     * it the same height as the SVG, and then using a child div with `margin: auto;`
     */
    return (
        <foreignObject className={className} x={x} y={y} width={width} height={height}>
            {renderedForeignObjectChildrenWrapper}
        </foreignObject>
    );
}

ForeignObject.propTypes = {
    className: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    htmlChildren: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func // (resizeTextRef, foreignObjectBoundingClientRectInWindow) => (React.Component)
    ]),
    htmlChildrenWrapperCls: PropTypes.string,
    htmlChildrenFontReductionOptions: PropTypes.shape({
        reduceByPx: PropTypes.number,
        onlyOnMobile: PropTypes.bool,
        onlyAtLength: PropTypes.number
    }),
    foreignObjectBoundingClientRectInWindow: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number,
        top: PropTypes.number,
        left: PropTypes.number,
        bottom: PropTypes.number,
        right: PropTypes.number
    })
};

ForeignObject.defaultProps = {};

export default ForeignObject;
