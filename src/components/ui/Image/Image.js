import React from 'react';
import PropTypes from 'prop-types';

class Image extends React.Component {
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
        return (
            <img
                className={this.props.className}
                src={this.state.imageSrc}
                alt={this.props.image}
                {...this.props.aria}
            />
        );
    }
}

Image.propTypes = {
    className: PropTypes.string,
    image: PropTypes.string,
    aria: PropTypes.object
};

Image.defaultProps = {
    className: '',
    image: '',
    aria: {}
};

export default Image;
