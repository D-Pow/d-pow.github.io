import React from 'react';
import PropTypes from "prop-types";

class Navbar extends React.Component {
    render() {
        return (
            <div></div>
        );
    }
}

Navbar.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string.isRequired,
        component: PropTypes.func
    }))
};

export default Navbar;
