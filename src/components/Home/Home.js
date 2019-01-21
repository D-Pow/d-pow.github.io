import React from 'react';
import 'styles/Header.scss';
import Triangle from 'components/Triangle';

class Home extends React.Component {
    renderTriangles(triangleHeight, numRows, numCols) {
        const row = [];
        for (let i = 0; i <= numCols; i++) {
            const color = Triangle.CONFIG.randomColor();
            // TODO add color-picking checks to prevent same colors from touching
            row.push((
                <Triangle color={color} height={triangleHeight} key={i} spinDelay={-5} upsideDown={i % 2 === 0} />
            ));
        }
        return (
            <div className={'flex-row'} style={{height: '1000px'}}>
                {row}
            </div>
        );
    }

    renderSplashSection() {
        // TODO add welcome text
        const numTriangleRowsInScreen = 6;
        const triangleHeight = window.innerHeight / numTriangleRowsInScreen;
        const numTrianglesInRow = Math.ceil(window.innerWidth / triangleHeight) * 2;
        return (
            <React.Fragment>
                {this.renderTriangles(triangleHeight, numTriangleRowsInScreen, numTrianglesInRow)}
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
