import React from 'react';
import 'styles/Triangle.scss';

class Triangle extends React.Component {
    render() {
        return (
            <div>
                <div className={'triangle'} />
                <div className={'triangle upside-down'} />
            </div>
        );
    }
}

export default Triangle;
