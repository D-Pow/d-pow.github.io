import {
    PureComponent,
    createRef,
} from 'react';
import PropTypes from 'prop-types';

import { attemptParseObjLiteral } from '@/utils/Objects';
import { importImageAsync } from '@/utils/Events';

import ForeignObject from './ForeignObject';

class Shape extends PureComponent {
    svgDimensions = {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
    };
    svgRef = createRef();

    foreignObjectSizeRatio = 0.8;
    foreignObjectPositionRatio = (1 - this.foreignObjectSizeRatio) / 2; // center x/y position by dividing by 2
    foreignObjectDimensions = {
        x: Math.round(this.svgDimensions.width * this.foreignObjectPositionRatio), // remove infinite repeating decimals by rounding
        y: Math.round(this.svgDimensions.height * this.foreignObjectPositionRatio),
        width: this.svgDimensions.width * this.foreignObjectSizeRatio,
        height: this.svgDimensions.height * this.foreignObjectSizeRatio,
    };

    constructor(props) {
        super(props);
        this.state = {
            imageSrc: '',
            svgBoundingClientRect: {},
        };
    }

    updateSvgBoundingClientRect() {
        this.setState({
            svgBoundingClientRect: attemptParseObjLiteral(this.svgRef.current.getBoundingClientRect()),
        });
    }

    handleScroll = () => {
        this.updateSvgBoundingClientRect();
    };

    get isUsingHtmlChildrenWithCustomResizeElem() {
        return typeof this.props.htmlChildren === typeof this.constructor;
    }

    componentDidMount() {
        if (this.props.image) {
            importImageAsync(this.props.image).then(imageSrc => this.setState({ imageSrc }));
        }

        if (this.svgRef.current && this.isUsingHtmlChildrenWithCustomResizeElem) {
            this.updateSvgBoundingClientRect();

            window.addEventListener('scroll', this.handleScroll);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    /**
     * Since SVGs have their own viewport, the results from the nested `foreignObject.getBoundingClientRect()`
     * will be relative to the SVG viewport. Thus, translate them here from SVG viewport to window viewport.
     *
     * To do this, take the SVG bounding client rect (which is relative to the window) and use the nested
     * foreignObject-to-SVG dimension ratios to calculate the pixel offsets by hand.
     *
     * @returns {Object} - Translated bounding client rects relative to window instead of SVG
     */
    get foreignObjectBoundingClientRectInWindow() {
        if (this.svgRef.current && this.isUsingHtmlChildrenWithCustomResizeElem) {
            const { foreignObjectSizeRatio, foreignObjectDimensions, state: { svgBoundingClientRect }} = this;

            const dy = svgBoundingClientRect.height / foreignObjectDimensions.y;
            const dx = svgBoundingClientRect.width / foreignObjectDimensions.x;

            const width = foreignObjectSizeRatio * svgBoundingClientRect.width;
            const height = foreignObjectSizeRatio * svgBoundingClientRect.height;

            return {
                x: svgBoundingClientRect.x + dx,
                y: svgBoundingClientRect.y + dy,
                width,
                height,
                top: svgBoundingClientRect.top + dy,
                left: svgBoundingClientRect.left + dx,
                bottom: svgBoundingClientRect.top + dy + height,
                right: svgBoundingClientRect.left + dx + width,
            };
        }

        return {};
    }

    get middleCoordinates() {
        return {
            x: (this.svgDimensions.x + this.svgDimensions.width) / 2,
            y: (this.svgDimensions.y + this.svgDimensions.height) / 2,
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

            points.push([ Math.round(x), Math.round(y) ]);
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
            <>
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
            </>
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
            htmlChildrenFontReductionOptions,
        } = this.props;

        if (!htmlChildren) {
            return null;
        }

        const { x, y, width, height } = this.foreignObjectDimensions;

        return (
            <ForeignObject
                x={x}
                y={y}
                width={width}
                height={height}
                htmlChildren={htmlChildren}
                htmlChildrenWrapperCls={htmlChildrenWrapperCls}
                foreignObjectBoundingClientRectInWindow={this.foreignObjectBoundingClientRectInWindow}
                htmlChildrenFontReductionOptions={htmlChildrenFontReductionOptions}
            />
        );
    }

    render() {
        const { x, y, width, height } = this.svgDimensions;

        return (
            <div className={this.props.className} {...this.props.aria}>
                <svg viewBox={`${x} ${y} ${width} ${height}`} ref={this.svgRef}>
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
    htmlChildren: ForeignObject.propTypes.htmlChildren,
    htmlChildrenWrapperCls: ForeignObject.propTypes.htmlChildrenWrapperCls,
    htmlChildrenFontReductionOptions: ForeignObject.propTypes.htmlChildrenFontReductionOptions,
    svgChildren: PropTypes.node,
    rotation: PropTypes.number, // degrees of rotation of shape
    aria: PropTypes.object,
};

Shape.defaultProps = {
    className: '',
    image: '',
    fill: '',
    sides: 6,
    rotation: 0,
    aria: {},
};

export default Shape;
