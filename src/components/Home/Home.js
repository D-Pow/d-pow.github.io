import React from 'react';
import 'styles/Header.scss';
import Triangle from 'components/Triangle';

class Home extends React.Component {
    renderTriangles() {
        const row = [];
        for (let i = 0; i <= Triangle.CONFIG.numTrianglesInRow; i++) {
            const color = Triangle.CONFIG.randomColor();
            row.push((
                <Triangle color={color} key={i} spinDelay={-5} upsideDown={i % 2 === 0} />
            ));
        }
        return (
            <div className={'flex-row'} style={{height: '1000px'}}>
                {row}
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.renderTriangles()}
            </React.Fragment>
        );
    }
}

export default Home;
