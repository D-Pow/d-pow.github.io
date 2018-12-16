import React from 'react';
import PropTypes from "prop-types";

class Navbar extends React.Component {
    renderRouteButtons() {
        return this.props.routes.map(routeAria => {
            const name = routeAria.component.name;
            const { path } = routeAria;
            const url = `${this.props.basedir}#${path}`;
            const currentPath = window.location.hash.slice(1);
            const active = currentPath === path;
            const classNames = ['nav-link'];
            if (active) {
                classNames.push('active');
            }
            return (
                <a className={classNames.join(' ')} href={url} key={url}>{name}</a>
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
    basedir: PropTypes.string.isRequired,
    routes: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired
    }))
};

export default Navbar;
