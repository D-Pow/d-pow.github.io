import React from 'react';
import 'styles/Home.scss';
import Triangle from 'components/Triangle';

class Home extends React.Component {
    renderTriangles() {
        const numRows = 6;
        const triangleHeight = window.innerHeight / numRows;
        const numTrianglesInRow = Math.ceil(window.innerWidth / triangleHeight) * 2; // Two triangles fit inside one base length

        const rows = [];
        for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
            const renderedRow = [];
            for (let colIndex = 0; colIndex < numTrianglesInRow; colIndex++) {
                const color = Triangle.CONFIG.randomColor();
                const spinDelay = Triangle.CONFIG.randomSpinDelay(-500, 500);
                // TODO add color-picking checks to prevent same colors from touching
                renderedRow.push((
                    <Triangle
                        color={color}
                        height={triangleHeight}
                        key={`${renderedRow}-${colIndex}`}
                        spinDelay={spinDelay}
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
