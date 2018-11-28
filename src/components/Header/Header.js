import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';

class Header extends React.Component {
    renderNav() {
        return (<Navbar routes={this.props.navRoutes} />);
    }

    render() {
        return (
            <header>
                {this.renderNav()}
            </header>
        );
    }
}

Header.propTypes = {
    navRoutes: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string.isRequired,
        component: PropTypes.func
    }))
};

export default Header;
