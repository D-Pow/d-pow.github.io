import React from 'react';
import PropTypes from 'prop-types';

import { childIsOfType, getChildName } from '@/utils/ReactParsing';

import Column from './Column';

class Row extends React.Component {
    render() {
        const renderedColumns = React.Children.map(this.props.children, (column, colIndex) => {
            return React.cloneElement(column, { gridArea: this.props.gridTemplateAreas[colIndex] });
        });

        return (
            <React.Fragment>
                {renderedColumns}
            </React.Fragment>
        );
    }
}

Row.propTypes = {
    children: props => {
        for (const child of React.Children.toArray(props.children)) {
            if (!childIsOfType(child, Column)) {
                return new Error(`Invalid child ${getChildName(child)} passed to Row. Expected Column.`);
            }
        }
    },
    gridTemplateAreas: PropTypes.arrayOf(PropTypes.string),
};

export default Row;
