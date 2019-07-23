import React from 'react';
import PropTypes from 'prop-types';

class InfoCard extends React.Component {

    render() {
        const textContent = (
            <React.Fragment>
                <h3 className={'p-2'}>{this.props.title}</h3>
                <p>{this.props.description}</p>
            </React.Fragment>
        );
        const pageContent = [ textContent, this.props.children ];

        return (
            <div className={`row ${this.props.className}`} ref={this.props.forwardedRef}>
                <div className={'col-sm-6 margin-center'}>
                    {pageContent[Number(this.props.flipped)]}
                </div>
                <div className={'col-sm-6'}>
                    {pageContent[Number(!this.props.flipped)]}
                </div>
            </div>
        );
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
