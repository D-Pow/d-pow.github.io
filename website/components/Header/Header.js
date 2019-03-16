import React from 'react';
import PropTypes from 'prop-types';
import 'styles/Header.scss';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classList: [
                'header',
                'float-right'
            ]
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.handleScroll();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const hideHeader = this.isActivePath(0) && window.pageYOffset === 0;
        this.toggleHeader(hideHeader);
    }

    toggleHeader(hide) {
        const classList = [...this.state.classList];
        const className = 'header-hidden';
        const isHidden = classList.indexOf(className) >= 0;
        if (hide && !isHidden) {
            classList.push(className);
        } else if (!hide && isHidden) {
            classList.splice(isHidden, 1);
        }
        this.setState({ classList: classList});
    }

    isActivePath(routeIndex) {
        const { path } = this.props.navRoutes[routeIndex];
        const currentPath = window.location.hash.slice(1);
        return currentPath === path;
    }

    renderNavBar() {
        const routeLinks = this.props.navRoutes.map((routeAria, index) => {
            const { path, name } = routeAria;
            const active = this.isActivePath(index);
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
            <nav className={'nav border-left border-bottom border-primary border-size-3 bg-dark'}>
                {routeLinks}
            </nav>
        );
    }

    render() {
        const navBar = this.renderNavBar();

        return (
            <header className={this.state.classList.join(' ')} ref={this.ref}>
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
