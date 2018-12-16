import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    renderRouteButtons() {
        return this.props.routes.map(routeAria => {
            const { path, component: { name }} = routeAria;
            const currentPath = window.location.hash.slice(1);
            const active = currentPath === path;
            const classNames = ['nav-link'];
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
            <nav className={'nav justify-content-end'}>
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
