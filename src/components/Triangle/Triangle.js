import React from 'react';
import PropTypes from 'prop-types';
import 'styles/Triangle.scss';
import triangleStyles from 'styles/Triangle.scss';
import { COLORS } from "../../utils/Constants";

class Triangle extends React.Component {
    static triangleBasePixels = `${triangleStyles.base}`.replace(/\D/g, '');

    static CONFIG = {
        colors: COLORS,
        randomColor: () => {
            return COLORS[Math.floor(Math.random() * COLORS.length)];
        },
        numTrianglesInRow: Math.ceil(window.innerWidth / Number(Triangle.triangleBasePixels)) * 2
    };

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
