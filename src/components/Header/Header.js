import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.handleScroll();
    }

    handleScroll() {
        const hideHeader = this.props.navRoutes[0].active && window.scrollY === 0;
        this.toggleHeader(hideHeader)
    }

    toggleHeader(hide) {
        const { classList } = this.ref.current;
        if (hide) {
            classList.remove('d-flex');
            classList.add('d-none');
        } else {
            classList.remove('d-none');
            classList.add('d-flex');
        }
    }

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
