import React from 'react';
import PropTypes from 'prop-types';

function SectionCard(props) {
    const pageContent = [ props.mainContent, props.children ];

    return (
        <div className={'row ' + props.className}>
            <div className={'col-sm-6 m-auto pb-4'}>
                {pageContent[Number(props.flipped)]}
            </div>
            <div className={'col-sm-6 m-auto'}>
                {pageContent[Number(!props.flipped)]}
            </div>
        </div>
    );
}

SectionCard.renderDefaultTextContent = (title, description) => (
    <div className={'m-auto'}>
        <h3 className={'p-2'}>{title}</h3>
        <p>{description}</p>
    </div>
);

SectionCard.propTypes = {
    className: PropTypes.string,

    // Main section of card
    mainContent: PropTypes.node,

    // Option to alternate left/right renders (desktop only)
    flipped: PropTypes.bool,

    children: PropTypes.node
};

SectionCard.defaultProps = {
    className: '',
    mainContent: '',
    flipped: false
};

export default SectionCard;
