import React from 'react';
import PropTypes from 'prop-types';
import { loadImage } from 'utils/Functions';

class Shape extends React.Component {
    constructor(props) {
        super(props);
        this.state = { imageSrc: '' };

        if (this.props.image) {
            loadImage(this.props.image).then(imageSrc => this.setState({ imageSrc }));
        }
    }

    getPointsFromRadius() {
        const { sides } = this.props;
        const radius = 50; // viewBox has size of 100 so distance to whatever side-length measure we're using is half that
        const angleBetweenVertices = 2 * Math.PI / sides;
        const points = [];

        for (let vertex = 0; vertex < sides; vertex++) {
            const angleFromRightMostVertex = angleBetweenVertices * vertex;
            const x = (Math.cos(angleFromRightMostVertex) * radius) + radius; // start at point (radius, radius), not (0, 0)
            const y = (Math.sin(angleFromRightMostVertex) * radius) + radius;

            points.push([Math.round(x), Math.round(y)]);
        }

        return points.map(point => point.join(',')).join(' ');
    }

    renderPolygon() {
        const polygonPoints =  this.getPointsFromRadius();

        // plain polygon
        if (!this.props.image) {
            return (
                <polygon
                    points={polygonPoints}
                    fill={this.props.fill}
                    transform={`rotate(${this.props.rotation}, 50, 50)`}
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
                            transform={`rotate(${this.props.rotation}, 50, 50)`}
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

    render() {
        return (
            <div className={this.props.className} {...this.props.aria}>
                <svg viewBox={'0 0 100 100'}>
                    {this.renderPolygon()}
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

    // degrees of rotation of shape
    rotation: PropTypes.number,
    aria: PropTypes.object
};

Shape.defaultProps = {
    className: '',
    image: '',
    fill: '',
    sides: 6,
    rotation: 0,
    aria: {}
};

export default Shape;
