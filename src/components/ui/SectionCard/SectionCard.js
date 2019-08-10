import React from 'react';
import PropTypes from 'prop-types';

class SectionCard extends React.Component {
    static colSize = 'col-sm-6';

    static renderDefaultTextContent(title, description) {
        return (
            <div className={`margin-center ${SectionCard.colSize}`}>
                <h3 className={'p-2'}>{title}</h3>
                <div className={'lead'}>{description}</div>
            </div>
        );
    }

    renderDesktop() {
        const renderedMain = this.props.mainContent;
        const renderedChildren = (
            <div className={`margin-center ${SectionCard.colSize}`}>
                {this.props.children}
            </div>
        );
        const pageContent = [ renderedMain, renderedChildren ];

        return (
            <div className={`d-none d-sm-block ${this.props.className}`}>
                <div className={'row'}>
                    {pageContent[Number(this.props.flipped)]}
                    {pageContent[Number(!this.props.flipped)]}
                </div>
            </div>
        );
    }

    renderMobile() {
        return (
            <div className={`d-block d-sm-none ${this.props.className}`}>
                <div className={'row margin-center mb-4'}>
                    {this.props.mainContent}
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.renderDesktop()}
                {this.renderMobile()}
            </React.Fragment>
        );
    }
}

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
