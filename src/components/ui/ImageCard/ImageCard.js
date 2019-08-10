import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/ui/Image';
import { useHover, Hooked } from 'utils/Hooks';

class ImageCard extends React.Component {
    renderHoverContent() {
        const { title, description } = this.props;
        const positionCls = 'position-absolute fixed-top w-100 h-100';
        const animationCls = 'duration-5 linear';

        return (
            <Hooked hook={useHover}>
                {([ ref, isHovered ]) => {
                    const hoverCls = isHovered ? ['show', 'slide-in-top', 'slide-in-bottom'] : ['', '', ''];

                    return (
                        <div
                            className={`bg-primary animated fade-in text-light ${positionCls} ${animationCls} ${hoverCls[0]}`}
                            ref={ref}
                        >
                            <h3 className={`m-5 ${animationCls} ${hoverCls[1]}`}>
                                {title}
                            </h3>
                            <p className={`p-3 ${animationCls} ${hoverCls[2]}`}>
                                {description}
                            </p>
                        </div>
                    );
                }}
            </Hooked>
        );
    }

    render() {
        return (
            <div className={this.props.className} {...this.props.aria}>
                {/* Obey parent's padding with `position: relative` */}
                <div className={'position-relative'}>
                    <Image image={this.props.image} />
                    {this.renderHoverContent()}
                </div>
            </div>
        );
    }
}

ImageCard.propTypes = {
    className: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    aria: PropTypes.object
};

ImageCard.defaultProps = {
    className: '',
    image: '',
    title: '',
    description: '',
    aria: {}
};

export default ImageCard;
