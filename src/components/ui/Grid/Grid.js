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
        const children = React.Children.toArray(this.props.children);
        const numRows = React.Children.count(this.props.children);
        const style = {};

        if (numRows > 0) {
            style.gridTemplateAreas = children.map(row => {
                const rowChildren = React.Children.toArray(row.props.children);

                if (rowChildren.length > 0) {
                    return `'${rowChildren.map(col => col.props.areaName).join(' ')}'`;
                }

                return `'${row.props.areaName}'`;
            }).join(' ');
        }

        return (
            <div className={`${this.props.className} grid`} style={style}>
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
    className: PropTypes.string
};

Grid.defaultProps = {
    className: ''
};

export default Grid;
