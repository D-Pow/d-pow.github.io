import React from 'react';
import 'styles/Header.scss';
import Triangle from 'components/Triangle';

class Home extends React.Component {
    render() {
        return (
            <div style={{height: '1000px'}}>
                <Triangle />
            </div>
        );
    }
}

export default Home;
