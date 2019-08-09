import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import Column from './Column';
import { childIsOfType, getChildName } from 'utils/Functions';
import 'styles/Common.scss';
import 'styles/Grid.scss';

class Grid extends React.Component {
    static Row = Row;
    static Column = Column;

    generateGridNames() {
        const gridAreaNamesUsed = [];
        const gridTemplateAreasText = React.Children.map(this.props.children, (row, rowIndex) => {
            const rowAreaNamesUsed = [];
            const rowAreaNamesText = React.Children.map(row.props.children, (column, colIndex) => {
                const columnAreaName = `grid-cell-${rowIndex}-${colIndex}`;
                const columnAreaNames = Array.from({ length: column.props.colSpan }, () => {
                    return columnAreaName;
                });

                rowAreaNamesUsed.push(columnAreaName);

                return columnAreaNames.join(' ');
            });

            gridAreaNamesUsed.push(rowAreaNamesUsed);

            return `'${rowAreaNamesText.join(' ')}'`;
        }).join(' ');

        return { gridTemplateAreasText, gridAreaNamesUsed };
    }

    render() {
        const { gridTemplateAreasText, gridAreaNamesUsed } = this.generateGridNames();
        const renderedRows = React.Children.map(this.props.children, (row, index) => {
            return React.cloneElement(row, { gridTemplateAreas: gridAreaNamesUsed[index]})
        });
        const style = {
            gridTemplateAreas: gridTemplateAreasText,
            width: this.props.width
        };

        return (
            <div className={`${this.props.className} grid`} style={style}>
                {renderedRows}
            </div>
        );
    }
}

Grid.propTypes = {
    children: props => {
        for (let child of React.Children.toArray(props.children)) {
            if (!childIsOfType(child, Row)) {
                return new Error(`Invalid child ${getChildName(child)} passed to Grid. Expected Row.`);
            }
        }
    },
    className: PropTypes.string,
    width: PropTypes.string
};

Grid.defaultProps = {
    className: '',
    width: '100%'
};

export default Grid;
