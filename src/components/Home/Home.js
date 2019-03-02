import React from 'react';
import 'styles/Home.scss';
import { randomColor } from 'utils/Functions';
import Triangle from 'components/Triangle';

class Home extends React.Component {
    pageText = {
        welcomeTitle: "Hey there, I'm Devon!"
    };

    numRows = 8;

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

        window.onresize = () => {
            this.setState({
                windowSize: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            });
            this.updateTriangleColorMatrix();
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

    get triangleHeight() {
        return this.state.windowSize.height / this.numRows;
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
        for (let rowIndex = 0; rowIndex < this.numRows; rowIndex++) {
            if (!chosenColors[rowIndex]) {
                chosenColors.push([]);
            }

            const row = chosenColors[rowIndex];
            for (let colIndex = 0; colIndex < numTrianglesInRow; colIndex++) {
                if (!row[colIndex]) {
                    const neighboringColors = this.getNeighboringColors(rowIndex, colIndex, chosenColors);
                    const color = randomColor(neighboringColors);
                    chosenColors[rowIndex].push(color);
                }
            }
        }

        this.setState({ triangleColorMatrix: chosenColors });
    }

    renderTriangles() {
        const { triangleColorMatrix } = this.state;

        const renderedTriangleMatrix = triangleColorMatrix.map((row, rowIndex) => row.map((col, colIndex) => (
            <Triangle
                color={col}
                height={this.triangleHeight}
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
