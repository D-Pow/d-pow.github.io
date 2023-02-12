import React from 'react';
import PropTypes from 'prop-types';

import Image from '@/components/ui/Image';

function InfoCard(props) {
    const renderedContent = (
        <div className={'text-left'}>
            <Image className={'mb-3'} image={props.image} />
            <h3 className={'mb-3'}>{props.title}</h3>
            <p className={'mb-4'}>{props.description}</p>
            <div className={'d-block d-sm-none segment-bar'} />
        </div>
    );
    const hoverCls = props.expandOnHoverInDesktop ? 'hover-expand hover-shadow-sm' : '';

    return (
        <React.Fragment>
            <div className={`d-none d-sm-block p-2 ${hoverCls} ${props.className}`} {...props.aria}>
                {renderedContent}
            </div>
            <div className={`d-block d-sm-none p-2 ${props.className}`} {...props.aria}>
                {renderedContent}
            </div>
        </React.Fragment>
    );
}

InfoCard.propTypes = {
    className: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.node,
    description: PropTypes.node,
    expandOnHoverInDesktop: PropTypes.bool,
    aria: PropTypes.object,
};

InfoCard.defaultProps = {
    className: '',
    image: '',
    title: '',
    description: '',
    expandOnHoverInDesktop: true,
    aria: {},
};

export default InfoCard;
