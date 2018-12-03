import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';

class Header extends React.Component {
    renderNav() {
        return (<Navbar basedir={this.props.basedir} routes={this.props.navRoutes} />);
    }

    render() {
        return (
            <header className={'d-flex w-100 justify-content-center'}>
                <div className={'navbar-brand'}>
                    Header
                </div>
                {this.renderNav()}
            </header>
        );
    }
}

Header.propTypes = {
    basedir: PropTypes.string.isRequired,
    navRoutes: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired
    }))
};

export default Header;
