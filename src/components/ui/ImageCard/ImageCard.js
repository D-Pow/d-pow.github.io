import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/ui/Image';
import { useHover, Hooked } from 'utils/Hooks';
import ContextFactory from 'utils/Context';

const defaultContextValue = 'auto';
const ImageCardSizeContext = ContextFactory(defaultContextValue);

class ImageCard extends React.Component {
    static contextType = ImageCardSizeContext.Context;
    static SameHeightProvider = ImageCardSizeContext.Provider;

    ref = React.createRef();

    updateContextHeight = () => {
        const { height } = this.ref.current.getBoundingClientRect();

        if (this.context.value === defaultContextValue || this.context.value > height) {
            this.context.setValue(height);
        }
    };

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
            <div className={this.props.className} ref={this.ref} {...this.props.aria}>
                {/* Obey parent's padding with `position: relative` */}
                <div className={'position-relative w-100'} style={{ height: `${this.context.value}px`, overflow: 'hidden' }}>
                    <Image image={this.props.image} onLoad={this.updateContextHeight} />
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
