import React from 'react';
import PropTypes from 'prop-types';
import { isMobileBrowser } from 'utils/BrowserIdentification';
import { getRandomColor } from 'utils/Scss';
import Triangle from 'components/ui/Triangle';

class FullPageTriangles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windowSize: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            triangleColorMatrix: []
        };
    }

    componentDidMount() {
        this.updateTriangleColorMatrix();

        if (!isMobileBrowser({ includeTablets: true })) {
            window.addEventListener('resize', this.handleResize);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.setState({
            windowSize: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
        this.updateTriangleColorMatrix();
    };

    get triangleHeight() {
        return this.state.windowSize.height / this.props.numRows;
    }

    getNeighboringColors(rowIndex, colIndex, colorMatrix) {
        const neighbors = [];
        if (rowIndex > 0) {
            neighbors.push(colorMatrix[rowIndex-1][colIndex]);
        }
        if (colIndex > 0) {
            neighbors.push(colorMatrix[rowIndex][colIndex-1]);
        }
        return neighbors;
    }

    updateTriangleColorMatrix() {
        const { triangleHeight } = this;
        const { windowSize: { width }, triangleColorMatrix } = this.state;
        const numTrianglesInRow = Math.ceil(width / triangleHeight) * 2; // Two triangles fit inside one base length

        const chosenColors = triangleColorMatrix.map(row => row.slice(0, numTrianglesInRow));  // delete extra, unnecessary rows
        for (let rowIndex = 0; rowIndex < this.props.numRows; rowIndex++) {
            if (!chosenColors[rowIndex]) {
                chosenColors.push([]);
            }

            const row = chosenColors[rowIndex];
            for (let colIndex = 0; colIndex < numTrianglesInRow; colIndex++) {
                if (!row[colIndex]) {
                    const neighboringColors = this.getNeighboringColors(rowIndex, colIndex, chosenColors);
                    let color = getRandomColor(neighboringColors, ['primary', 'secondary', 'tertiary', 'info', 'dark']);
                    chosenColors[rowIndex].push(color);
                }
            }
        }

        this.setState({ triangleColorMatrix: chosenColors });
    }

    render() {
        const { triangleColorMatrix } = this.state;

        const renderedTriangleMatrix = triangleColorMatrix.map((row, rowIndex) => row.map((col, colIndex) => (
            <Triangle
                className={'animation-infinite'}
                color={col}
                height={this.triangleHeight}
                key={`${rowIndex}-${colIndex}`}
                upsideDown={(colIndex + rowIndex) % 2 === 0}
            />
        )));

        return (
            <div className={'triangle-section bg-white'}>
                {renderedTriangleMatrix.map((row, i) => (
                    <div className={'overflow-hidden'} key={i}>
                        {row}
                    </div>
                ))}
            </div>
        );
    }
}

FullPageTriangles.propTypes = {
    numRows: PropTypes.number
};

FullPageTriangles.defaultProps = {
    numRows: 8
};

export default FullPageTriangles;
