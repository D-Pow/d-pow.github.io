import React from 'react';
import PropTypes from 'prop-types';
import { parseScssMap } from 'utils/Functions';
import { gridBreakpoints } from 'styles/Common.scss';

class InfoCard extends React.Component {
    renderDesktop(pageContent) {
        return (
            <div className={`d-none d-sm-block ${this.props.className}`}>
                <div className={'row'} ref={this.props.forwardedRef}>
                    <div className={'col-sm-6 margin-center'}>
                        {pageContent[Number(this.props.flipped)]}
                    </div>
                    <div className={'col-sm-6'}>
                        {pageContent[Number(!this.props.flipped)]}
                    </div>
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
        const pageContent = [ textContent, this.props.children ];

        // Since refs only work when attached to the actual div they pertain to, render only one of either desktop or mobile
        const mobileThreshold = Number(parseScssMap(gridBreakpoints).sm.replace(/\D/g, ''));
        const isMobile = window.innerWidth < mobileThreshold;

        return isMobile ? this.renderMobile(textContent) : this.renderDesktop(pageContent);
    }
}

InfoCard.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.node,
    flipped: PropTypes.bool,
    forwardedRef: PropTypes.object
};

InfoCard.defaultProps = {
    className: '',
    title: '',
    description: '',
    flipped: false
};

export default React.forwardRef((props, ref) => <InfoCard forwardedRef={ref} {...props} />);
