import React from 'react';
import PropTypes from 'prop-types';
import { loadImage } from 'utils/Functions';

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = { imageSrc: '' };
        loadImage(this.props.image).then(imageSrc => this.setState({ imageSrc }));
    }

    render() {
        return (
            <img
                className={`${this.props.fillParent ? 'img-fluid' : ''} ${this.props.className}`}
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
    fillParent: PropTypes.bool,
    aria: PropTypes.object
};

Image.defaultProps = {
    className: '',
    image: '',
    fillParent: true,
    aria: {}
};

export default Image;
