import React from 'react';
import PropTypes from 'prop-types';
import { importImageAsync, asNumber, isMobileBrowser } from 'utils/Functions';
import { Hooked, useDynamicFontSizeShrinking } from 'utils/Hooks';

class Shape extends React.Component {
    svgDimensions = {
        x: 0,
        y: 0,
        width: 100,
        height: 100
    };

    foreignObjectSizeRatio = 0.8;
    foreignObjectPositionRatio = (1 - this.foreignObjectSizeRatio) / 2; // center x/y position by dividing by 2
    foreignObjectDimensions = {
        x: Math.round(this.svgDimensions.width * this.foreignObjectPositionRatio), // remove infinite repeating decimals by rounding
        y: Math.round(this.svgDimensions.height * this.foreignObjectPositionRatio),
        width: this.svgDimensions.width * this.foreignObjectSizeRatio,
        height: this.svgDimensions.height * this.foreignObjectSizeRatio
    };

    constructor(props) {
        super(props);
        this.state = { imageSrc: '' };

        if (this.props.image) {
            importImageAsync(this.props.image).then(imageSrc => this.setState({ imageSrc }));
        }
    }

    get middleCoordinates() {
        return {
            x: (this.svgDimensions.x + this.svgDimensions.width) / 2,
            y: (this.svgDimensions.y + this.svgDimensions.height) / 2
        };
    }

    getPointsFromRadius() {
        const { sides } = this.props;
        // viewBox has size of 100 so distance to whatever side-length measure we're using is half that
        const radius = (this.middleCoordinates.x + this.middleCoordinates.y) / 2;
        const angleBetweenVertices = 2 * Math.PI / sides;
        const points = [];

        for (let vertex = 0; vertex < sides; vertex++) {
            const angleFromRightMostVertex = angleBetweenVertices * vertex;
            // start at point (radius, radius), not (0, 0), and work our way around the polygon counterclockwise
            const x = (Math.cos(angleFromRightMostVertex) * radius) + radius;
            const y = (Math.sin(angleFromRightMostVertex) * radius) + radius;

            points.push([Math.round(x), Math.round(y)]);
        }

        return points.map(point => point.join(',')).join(' ');
    }

    renderPolygon() {
        const polygonPoints =  this.getPointsFromRadius();
        const { x, y } = this.middleCoordinates;

        // plain polygon
        if (!this.props.image) {
            return (
                <polygon
                    points={polygonPoints}
                    fill={this.props.fill}
                    transform={`rotate(${this.props.rotation}, ${x}, ${y})`}
                />
            );
        }

        // clip path (image)
        const patternId = Math.random().toString(36).substr(2); // radix = 36 uses both letters and numbers
        return (
            <React.Fragment>
                <defs>
                    <clipPath
                        id={patternId}
                        clipPathUnits={'userSpaceOnUse'}
                    >
                        <polygon
                            points={polygonPoints}
                            transform={`rotate(${this.props.rotation}, ${x}, ${y})`}
                        />
                    </clipPath>
                </defs>

                <image
                    href={this.state.imageSrc}
                    preserveAspectRatio={`xMidYMid slice`}
                    clipPath={`url(#${patternId})`}
                    width={'100%'}
                    height={'100%'}
                />
            </React.Fragment>
        );
    }

    /**
     * Renders optional HTML content in the center of the SVG polygon.
     * Nested inside a `foreignObject` that takes up 80% of the width/height
     * of the SVG itself so that the HTML content doesn't go outside the
     * SVG shape's borders.
     *
     * This is more favorable than using `position: absolute;` HTML
     * elements placed on top of <Shape/> because any text passed through
     * this prop will automatically resize its font-size based on the size
     * of the whole SVG.
     *
     * @returns {(null|Node)}
     */
    renderHtmlChildren() {
        const {
            htmlChildren,
            htmlChildrenWrapperCls,
            htmlChildrenFontReductionOptions: {
                reduceByPx,
                onlyOnMobile,
                onlyAtLength
            }
        } = this.props;

        if (!htmlChildren) {
            return null;
        }

        const { x, y, width, height } = this.foreignObjectDimensions;

        const slightlySmallerThanLargestPossibleFontSize = (fontSizePxStr) => {
            let reduceFontSize = true;

            if (onlyOnMobile) {
                reduceFontSize = reduceFontSize && isMobileBrowser();
            }

            if (typeof onlyAtLength === typeof 0) {
                reduceFontSize = reduceFontSize && (typeof htmlChildren === typeof '') && htmlChildren.length >= onlyAtLength;
            }

            return reduceFontSize ? `${asNumber(fontSizePxStr) - reduceByPx}px` : fontSizePxStr;
        };

        const TextWrapper = ({ constrainingElem, fontSizePx, children, toResizeElem }) => (
            <div className={`text-center d-flex h-100 w-100 ${htmlChildrenWrapperCls}`} ref={constrainingElem}>
                <div
                    className={'m-auto'}
                    ref={toResizeElem}
                    style={{
                        fontSize: slightlySmallerThanLargestPossibleFontSize(fontSizePx)
                    }}
                >
                    {children}
                </div>
            </div>
        );

        /**
         * Since SVG doesn't support text-wrapping by default, use `foreignObject`
         * with nested `div`s to allow text-wrapping.
         * Also, center the text content by setting div wrapper's display to flex, making
         * it the same height as the SVG, and then using a child div with `margin: auto;`
         */
        return (
            <foreignObject x={x} y={y} width={width} height={height}>
                <Hooked hook={useDynamicFontSizeShrinking}>
                    {([ constrainingElem, toResizeElem, fontSizePx ]) => {
                        if (typeof htmlChildren === typeof (() => {})) {
                            return (
                                <TextWrapper constrainingElem={constrainingElem} fontSizePx={fontSizePx}>
                                    {htmlChildren(toResizeElem)}
                                </TextWrapper>
                            );
                        }

                        return (
                            <TextWrapper constrainingElem={constrainingElem} fontSizePx={fontSizePx} toResizeElem={toResizeElem}>
                                {htmlChildren}
                            </TextWrapper>
                        );
                    }}
                </Hooked>
            </foreignObject>
        );
    }

    render() {
        const { x, y, width, height } = this.svgDimensions;

        return (
            <div className={this.props.className} {...this.props.aria}>
                <svg viewBox={`${x} ${y} ${width} ${height}`}>
                    {this.renderPolygon()}
                    {this.renderHtmlChildren()}
                    {this.props.svgChildren}
                </svg>
            </div>
        );
    }
}

Shape.propTypes = {
    className: PropTypes.string,
    image: PropTypes.string,
    fill: PropTypes.string,
    sides: PropTypes.number,
    htmlChildren: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ]),
    htmlChildrenWrapperCls: PropTypes.string,
    htmlChildrenFontReductionOptions: PropTypes.shape({
        reduceByPx: PropTypes.number,
        onlyOnMobile: PropTypes.bool,
        onlyAtLength: PropTypes.number
    }),
    svgChildren: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf([ PropTypes.node ])
    ]),

    // degrees of rotation of shape
    rotation: PropTypes.number,
    aria: PropTypes.object
};

Shape.defaultProps = {
    className: '',
    image: '',
    fill: '',
    htmlChildrenWrapperCls: '',
    htmlChildrenFontReductionOptions: {
        reduceByPx: 4
    },
    sides: 6,
    rotation: 0,
    aria: {}
};

export default Shape;
