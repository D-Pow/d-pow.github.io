import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/ui/Image';

class InfoCard extends React.Component {

    render() {
        const textContent = (
            <React.Fragment>
                <h3 className={'p-2'}>{this.props.title}</h3>
                <p>{this.props.description}</p>
            </React.Fragment>
        );
        const imageContent = (<Image image={this.props.image} />);
        const pageContent = [ textContent, imageContent ];

        return (
            <React.Fragment>
                <div className={'row'}>
                    <div className={'col-sm-6 margin-center'}>
                        {pageContent[Number(this.props.flipped)]}
                    </div>
                    <div className={'col-sm-6'}>
                        {pageContent[Number(!this.props.flipped)]}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

InfoCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    flipped: PropTypes.bool
};

InfoCard.defaultProps = {
    title: '',
    description: '',
    image: '',
    flipped: false
};

export default InfoCard;
