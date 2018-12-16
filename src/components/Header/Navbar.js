import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    renderRouteButtons() {
        return this.props.routes.map(routeAria => {
            const { path, name } = routeAria;
            const currentPath = window.location.hash.slice(1);
            const active = currentPath === path;
            const classNames = ['nav-link text-light'];
            if (active) {
                classNames.push('active');
            }
            return (
                <Link to={path} className={classNames.join(' ')} key={path} replace={active}>{name}</Link>
            );
        });
    }

    render() {
        return (
            <nav className={'nav ml-auto border-left border-bottom border-primary border-size-3'}>
                {this.renderRouteButtons()}
            </nav>
        );
    }
}

Navbar.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired
    }))
};

export default Navbar;
