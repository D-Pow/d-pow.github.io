import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/ui/Image';

function InfoCard(props) {
    return (
        <div className={`text-left ${props.className}`} {...props.aria}>
            <Image className={'mb-3'} image={props.image} />
            <h3 className={'mb-3'}>{props.title}</h3>
            <p className={'mb-3'}>{props.description}</p>
            <div className={'d-block d-sm-none segment-bar'} />
        </div>
    );
}

InfoCard.propTypes = {
    className: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.node,
    description: PropTypes.node,
    aria: PropTypes.object
};

InfoCard.defaultProps = {
    className: '',
    image: '',
    title: '',
    description: '',
    aria: {}
};

export default InfoCard;
