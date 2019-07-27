import React from 'react';
import PropTypes from 'prop-types';
import { parseScssMap } from 'utils/Functions';
import { gridBreakpoints } from 'styles/Common.scss';

class InfoCard extends React.Component {
    renderDesktop(textContent) {
        const colSize = 'col-sm-6';
        const renderedText = (
            <div className={`${colSize} margin-center`}>
                {textContent}
            </div>
        );
        const renderedChildren = (
            <div className={colSize}>
                {this.props.children}
            </div>
        );
        const pageContent = [ renderedText, renderedChildren ];

        return (
            <div className={`d-none d-sm-block ${this.props.className}`}>
                <div className={'row'} ref={this.props.forwardedRef}>
                    {pageContent[Number(this.props.flipped)]}
                    {pageContent[Number(!this.props.flipped)]}
                </div>
            </div>
        );
    }

    renderMobile(textContent) {
        return (
            <div className={`d-block d-sm-none ${this.props.className}`} ref={this.props.forwardedRef}>
                <div className={'row margin-center mb-4'}>
                    {textContent}
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }

    render() {
        const textContent = (
            <React.Fragment>
                <h3 className={'p-2'}>{this.props.title}</h3>
                <div className={'lead'}>{this.props.description}</div>
            </React.Fragment>
        );

        // Since refs only work when attached to the actual div they pertain to, render only one of either desktop or mobile
        const mobileThreshold = Number(parseScssMap(gridBreakpoints).sm.replace(/\D/g, ''));
        const isMobile = window.innerWidth < mobileThreshold;

        return isMobile ? this.renderMobile(textContent) : this.renderDesktop(textContent);
    }
}

InfoCard.propTypes = {
    className: PropTypes.string,

    // Text content; main section of card
    title: PropTypes.string,
    description: PropTypes.node,

    // Option to alternate left/right renders (desktop only)
    flipped: PropTypes.bool,

    // Ref for entire rendered content
    forwardedRef: PropTypes.object
};

InfoCard.defaultProps = {
    className: '',
    title: '',
    description: '',
    flipped: false
};

export default React.forwardRef((props, ref) => <InfoCard forwardedRef={ref} {...props} />);
