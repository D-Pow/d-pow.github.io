import React from 'react';
import PropTypes from 'prop-types';

class InfoCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { imageSrc: '' };
        this.loadImage();
    }

    loadImage() {
        const { image } = this.props;

        if (image !== '') {
            import(`assets/${image}`).then(module => {
                this.setState({ imageSrc: module.default });
            });
        }
    }

    render() {
        const textContent = (
            <React.Fragment>
                <h3 className={'p-2'}>{this.props.title}</h3>
                <p>{this.props.description}</p>
            </React.Fragment>
        );
        const imageContent = (<img src={this.state.imageSrc} alt={this.props.image} />);
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
