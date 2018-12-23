import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class Header extends React.Component {
    renderNavBar() {
        const routeLinks = this.props.navRoutes.map(routeAria => {
            const { path, name } = routeAria;
            const currentPath = window.location.hash.slice(1);
            const active = currentPath === path;
            const classNames = ['nav-link'];
            if (active) {
                routeAria.active = true;
                classNames.push('active');
            }
            return (
                <Link to={path} className={classNames.join(' ')} key={path} replace={active}>{name}</Link>
            );
        });

        return (
            <nav className={'nav ml-auto border-left border-bottom border-primary border-size-3'}>
                {routeLinks}
            </nav>
        );
    }

    render() {
        const navBar = this.renderNavBar();
        const classNames = [
            'header',
            'd-flex',
            'w-100',
            'justify-content-center'
        ];

        return (
            <header className={classNames.join(' ')} ref={this.ref}>
                {navBar}
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
