import React from 'react';
import PropTypes from 'prop-types';
import 'styles/Triangle.scss';
import { COLORS } from "../../utils/Constants";

class Triangle extends React.Component {
    static CONFIG = {
        colors: COLORS,
        randomColor: () => {
            return COLORS[Math.floor(Math.random() * COLORS.length)];
        },
        randomSpinDelay: (start, end) => {
            return (Math.random() * (end - start)) + start;
        }
    };

    render() {
        const {
            upsideDown,
            color,
            spinDelay,
            height
        } = this.props;
        const base = height / Math.sin(Math.PI / 3); // Equilateral triangle: sin(60deg == pi/3) = height / base
        const baseHalved = base/2; // Actual CSS base length

        let borderColorField = 'borderBottomColor';
        let borderHeightField = 'borderBottomWidth';
        let originHeight = `${height * 2/3}px`; // deal with uneven border widths by offsetting rotation origin
        const classNames = [
            'triangle'
        ];
        if (upsideDown) {
            borderColorField = 'borderTopColor';
            borderHeightField = 'borderTopWidth';
            originHeight = `${height / 3}px`;
            classNames.push('upside-down');
        }

        const style = {
            [borderColorField]: color,
            [borderHeightField]: `${height}px`,
            borderLeftWidth: `${baseHalved}px`,
            borderRightWidth: `${baseHalved}px`,
            animationDelay: `${spinDelay}s`,
            transformOrigin: `${baseHalved} ${originHeight}`,
            marginLeft: `-${baseHalved}px`
        };

        return (
            <div className={classNames.join(' ')} style={style} />
        );
    }
}

Triangle.propTypes = {
    color: PropTypes.string,
    spinDelay: PropTypes.number,
    upsideDown: PropTypes.bool,
    height: PropTypes.number
};

Triangle.defaultProps = {
    color: 'red',
    spinDelay: 0,
    upsideDown: false,
    height: 86
};

export default Triangle;
