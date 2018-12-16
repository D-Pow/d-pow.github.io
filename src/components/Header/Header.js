import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';

class Header extends React.Component {
    render() {
        return (
            <header className={'d-flex w-100 justify-content-center'}>
                <Navbar routes={this.props.navRoutes} />
            </header>
        );
    }
}

Header.propTypes = {
    navRoutes: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired
    }))
};

export default Header;
