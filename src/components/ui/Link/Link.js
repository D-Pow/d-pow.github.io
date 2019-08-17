import React from 'react';
import PropTypes from 'prop-types';

function Link(props) {
    return (
        <a className={props.className} href={props.href} target={'_blank'} {...props.aria}>
            {props.children}
        </a>
    );
}

Link.propTypes = {
    className: PropTypes.string,
    href: PropTypes.string,
    children: PropTypes.node,
    aria: PropTypes.object
};

Link.defaultProps = {
    className: '',
    href: '',
    children: '',
    aria: {}
};

export default Link;
