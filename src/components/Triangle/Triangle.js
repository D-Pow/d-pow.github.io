import React from 'react';
import PropTypes from 'prop-types';
import 'styles/Triangle.scss';
import { COLORS } from "../../utils/Constants";

class Triangle extends React.Component {
    static CONFIG = {
        colors: COLORS,
        randomColor: () => {
            return COLORS[Math.floor(Math.random() * COLORS.length)];
        }
    };

    render() {
        const {
            upsideDown,
            color,
            spinDelay,
            height
        } = this.props;
        const base = height / Math.sin(Math.PI / 3);
        const baseHalved = base/2;

        let borderColorField = 'borderBottomColor';
        let borderHeightField = 'borderBottomWidth';
        let originHeight = `${height * 2/3}px`;
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
