import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import Column from './Column';
import { childIsOfType, getChildName } from 'utils/Functions';
import 'styles/Grid.scss';

class Grid extends React.Component {
    static Row = Row;
    static Column = Column;

    render() {
        const { areasFormat, className } = this.props;
        const style = {};

        if (areasFormat) {
            style['gridTemplateAreas'] = areasFormat.map(rowEntries => {
                return rowEntries.join(' ');
            }).map(row => {
                return `'${row}'`
            }).join(' ');
        }

        return (
            <div className={`${className} grid`} style={style}>
                {this.props.children}
            </div>
        );
    }
}

Grid.propTypes = {
    children: props => {
        for (let child of React.Children.toArray(props.children)) {
            if (!childIsOfType(child, Row)) {
                return new Error(`Invalid prop ${getChildName(child)} passed to Grid. Expected Row.`);
            }
        }
    },
    className: PropTypes.string,
    columns: PropTypes.number,
    areasFormat: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    rows: PropTypes.number
};

Grid.defaultProps = {
    className: ''
};

export default Grid;
