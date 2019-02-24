import React from 'react';
import 'styles/Home.scss';
import { randomColor } from 'utils/Functions';
import Triangle from 'components/Triangle';

class Home extends React.Component {
    componentDidMount() {
        window.onresize = () => {
            this.forceUpdate();
        }
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

    renderTriangles() {
        const numRows = 8;
        const triangleHeight = window.innerHeight / numRows;
        const numTrianglesInRow = Math.ceil(window.innerWidth / triangleHeight) * 2; // Two triangles fit inside one base length

        const rows = [];
        const chosenColors = [];
        for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
            chosenColors.push([]);
            const renderedRow = [];
            for (let colIndex = 0; colIndex < numTrianglesInRow; colIndex++) {
                const neighboringColors = this.getNeighboringColors(rowIndex, colIndex, chosenColors);
                const color = randomColor(neighboringColors);
                chosenColors[rowIndex].push(color);
                renderedRow.push((
                    <Triangle
                        color={color}
                        height={triangleHeight}
                        key={`${rowIndex}-${colIndex}`}
                        upsideDown={(colIndex + rowIndex) % 2 === 0}
                    />
                ));
            }
            rows.push(renderedRow);
        }

        return (
            <div className={'triangle-section'}>
                {rows.map((row, i) => (
                    <div className={'triangle-row'} key={i}>
                        {row}
                    </div>
                ))}
            </div>
        );
    }

    renderSplashSection() {
        // TODO add welcome text
        return (
            <React.Fragment>
                {this.renderTriangles()}
                <div style={{height: '500px'}}>Meh</div>
            </React.Fragment>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.renderSplashSection()}
            </React.Fragment>
        );
    }
}

export default Home;
