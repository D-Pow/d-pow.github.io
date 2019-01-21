import React from 'react';
import 'styles/Header.scss';
import Triangle from 'components/Triangle';

class Home extends React.Component {
    renderTriangles() {
        const numRows = 6;
        const triangleHeight = window.innerHeight / numRows;
        const numTrianglesInRow = Math.ceil(window.innerWidth / triangleHeight);
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            const row = [];
            for (let col = 0; col <= numTrianglesInRow; col++) {
                const color = Triangle.CONFIG.randomColor();
                // TODO add color-picking checks to prevent same colors from touching
                row.push((
                    <Triangle color={color} height={triangleHeight} key={col} spinDelay={-5} upsideDown={col % 2 === 0} />
                ));
            }
            rows.push(row);
        }
        return (
            <div style={{height: `${window.innerHeight}px`, lineHeight: 0}}>
                {rows.map((row, i) => (
                    <div className={'flex-row'} key={i}>
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
