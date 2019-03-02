import React from 'react';
import 'styles/Home.scss';
import { randomColor } from 'utils/Functions';
import Triangle from 'components/Triangle';

class Home extends React.Component {
    pageText = {
        welcomeTitle: "Hey there, I'm Devon!"
    };

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
        window.onresize = () => {
            this.setState({
                windowSize: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            });
        }
    }

    componentWillUnmount() {
        window.onresize = null;
    }

    renderWelcomeText() {
        const renderedTitle = (<h2 className={'text-white'}>{this.pageText.welcomeTitle}</h2>);

        return (
            <div className={'text-center position-absolute w-100 top-30'}>
                <div className={'bg-dark border border-primary border-size-5 rounded shadow-lg m-auto py-3 px-1'} style={{width: '40%'}}>
                    {renderedTitle}
                </div>
            </div>
        );
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

    initTriangleColorMatrix(numRows, numTrianglesInRow) {
        const chosenColors = [];
        for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
            chosenColors.push([]);
            const renderedRow = [];
            for (let colIndex = 0; colIndex < numTrianglesInRow; colIndex++) {
                const neighboringColors = this.getNeighboringColors(rowIndex, colIndex, chosenColors);
                const color = randomColor(neighboringColors);
                chosenColors[rowIndex].push(color);
            }
        }

        this.setState({ triangleColorMatrix: chosenColors });
    }

    renderTriangles() {
        const { windowSize: { width, height }, triangleColorMatrix } = this.state;
        const numRows = 8;
        const triangleHeight = height / numRows;
        const numTrianglesInRow = Math.ceil(width / triangleHeight) * 2; // Two triangles fit inside one base length

        if (triangleColorMatrix.length === 0) {
            this.initTriangleColorMatrix(numRows, numTrianglesInRow);
        }

        const renderedTriangleMatrix = triangleColorMatrix.map((row, rowIndex) => row.map((col, colIndex) => (
            <Triangle
                color={col}
                height={triangleHeight}
                key={`${rowIndex}-${colIndex}`}
                upsideDown={(colIndex + rowIndex) % 2 === 0}
            />
        )));

        return (
            <div className={'triangle-section bg-white'}>
                {renderedTriangleMatrix.map((row, i) => (
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
                <div>
                    {this.renderTriangles()}
                    {this.renderWelcomeText()}
                </div>
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
