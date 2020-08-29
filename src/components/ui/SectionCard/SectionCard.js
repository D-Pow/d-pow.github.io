import React from 'react';
import PropTypes from 'prop-types';

function SectionCard(props) {
    const pageContent = [ props.mainContent, props.children ];

    return (
        <div className={props.className}>
            <div className={'row'}>
                <div className={'col-sm-6 mx-auto mb-4'}>
                    {pageContent[Number(props.flipped)]}
                </div>
                <div className={'col-sm-6 m-auto'}>
                    {pageContent[Number(!props.flipped)]}
                </div>
            </div>
        </div>
    );
}

SectionCard.colSize = 'col-sm-6';
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
