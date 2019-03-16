import React from 'react';
import PropTypes from 'prop-types';

class Row extends React.Component {
    render() {
        const { areaName } = this.props;
        const style = {};

        if (areaName) {
            style['gridArea'] = areaName;
        }

        return (
            <div className={this.props.className} style={style}>
                {this.props.children}
            </div>
        );
    }
}

Row.propTypes = {
    areaName: PropTypes.string,
    className: PropTypes.string,
    colSpan: PropTypes.number
};

Row.defaultProps = {
    className: '',
    colSpan: 1
};

export default Row;
