import React from 'react';
import PropTypes from 'prop-types';

import { randomNumber } from '@/utils/Numbers';
import { spinDurationMin, spinDurationMax } from '@/styles/Animation.scss';

class Triangle extends React.Component {
    render() {
        const {
            className,
            upsideDown,
            color,
            height,
        } = this.props;
        const base = height / Math.sin(Math.PI / 3); // Equilateral triangle: sin(60deg == pi/3) = height / base
        const baseHalved = base/2; // Actual CSS base length

        let borderColorField = 'borderBottomColor';
        let borderHeightField = 'borderBottomWidth';
        let originHeight = `${height * 2/3}px`; // deal with uneven border widths by offsetting rotation origin
        const classNames = [
            'triangle',
            className,
        ];
        if (upsideDown) {
            borderColorField = 'borderTopColor';
            borderHeightField = 'borderTopWidth';
            originHeight = `${height / 3}px`;
            classNames.push('upside-down');
        }

        const spinDelay = this.props.spinDelay || randomNumber(1);
        const animationDuration = this.props.animationDuration || Math.round(randomNumber(spinDurationMin, spinDurationMax));
        const style = {
            [borderColorField]: color,
            [borderHeightField]: `${height}px`,
            borderLeftWidth: `${baseHalved}px`,
            borderRightWidth: `${baseHalved}px`,
            animationName: `spin-${animationDuration}`,
            animationDuration: `${animationDuration}s`,
            animationDelay: `${spinDelay}s`,
            transformOrigin: `${baseHalved} ${originHeight}`,
            marginLeft: `-${baseHalved}px`,
        };

        return (
            <div className={classNames.join(' ')} style={style} />
        );
    }
}

Triangle.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    spinDelay: PropTypes.number,
    animationDuration: PropTypes.number,
    upsideDown: PropTypes.bool,
    height: PropTypes.number,
};

Triangle.defaultProps = {
    color: 'red',
    upsideDown: false,
    height: 86,
};

export default Triangle;
