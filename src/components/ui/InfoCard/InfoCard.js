import React from 'react';
import PropTypes from 'prop-types';

class InfoCard extends React.Component {
    static colSize = 'col-sm-6';

    static renderDefaultTextContent(title, description) {
        return (
            <div>
                <h3 className={'p-2'}>{title}</h3>
                <div className={'lead'}>{description}</div>
            </div>
        );
    }

    renderDesktop() {
        const renderedMain = (
            <div className={`${InfoCard.colSize} margin-center`}>
                {this.props.mainContent}
            </div>
        );
        const renderedChildren = (
            <div className={InfoCard.colSize}>
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

InfoCard.propTypes = {
    className: PropTypes.string,

    // Main section of card
    mainContent: PropTypes.node,

    // Option to alternate left/right renders (desktop only)
    flipped: PropTypes.bool,
};

InfoCard.defaultProps = {
    className: '',
    mainContent: '',
    flipped: false
};

export default InfoCard;
