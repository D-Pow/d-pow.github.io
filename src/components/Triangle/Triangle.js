import React from 'react';
import PropTypes from 'prop-types';
import 'styles/Triangle.scss';

class Triangle extends React.Component {
    render() {
        const {
            upsideDown,
            color,
            spinDelay
        } = this.props;
        const borderField = upsideDown ? 'borderTopColor' : 'borderBottomColor';
        const style = {
            [borderField]: color,
            'animationDelay': `${spinDelay}s`
        };
        const classNames = [
            'triangle'
        ];
        if (upsideDown) {
            classNames.push('upside-down');
        }

        return (
            <div className={classNames.join(' ')} style={style} />
        );
    }
}

Triangle.propTypes = {
    color: PropTypes.string,
    spinDelay: PropTypes.number,
    upsideDown: PropTypes.bool
};

Triangle.defaultProps = {
    color: 'red',
    spinDelay: 0,
    upsideDown: false
};

export default Triangle;
