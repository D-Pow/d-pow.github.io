import React from 'react';
import PropTypes from 'prop-types';

function SectionCard(props) {
    const renderDesktop = () => {
        const renderedMain = props.mainContent;
        const renderedChildren = (
            <div className={`m-auto ${SectionCard.colSize}`}>
                {props.children}
            </div>
        );
        const pageContent = [ renderedMain, renderedChildren ];

        return (
            <div className={`d-none d-sm-block ${props.className}`}>
                <div className={'row'}>
                    {pageContent[Number(props.flipped)]}
                    {pageContent[Number(!props.flipped)]}
                </div>
            </div>
        );
    };

    const renderMobile = () => {
        return (
            <div className={`d-block d-sm-none ${props.className}`}>
                <div className={'row mb-4'}>
                    <div className={'m-auto'}>
                        {props.mainContent}
                    </div>
                </div>
                <div>
                    {props.children}
                </div>
            </div>
        );
    };

    return (
        <React.Fragment>
            {renderDesktop()}
            {renderMobile()}
        </React.Fragment>
    );
}

SectionCard.colSize = 'col-sm-6';
SectionCard.renderDefaultTextContent = (title, description) => (
    <div className={`m-auto ${SectionCard.colSize}`}>
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
};

SectionCard.defaultProps = {
    className: '',
    mainContent: '',
    flipped: false
};

export default SectionCard;
