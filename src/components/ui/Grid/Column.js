import React from 'react';
import PropTypes from 'prop-types';

class Column extends React.Component {
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

Column.propTypes = {
    areaName: PropTypes.string,
    className: PropTypes.string
};

Column.defaultProps = {
    areaName: Column.name
};

export default Column;
