import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/ui/Image';
import { useHover, Hooked } from 'utils/Hooks';
import ContextFactory from 'utils/Context';
import { isMobileBrowser, validateObjNestedFields } from 'utils/Functions';

const defaultContextValue = 'auto';
const ImageCardSizeContext = ContextFactory(defaultContextValue);

class ImageCard extends React.Component {
    static SameHeightConsumer = ImageCardSizeContext.Consumer;
    static SameHeightProvider = ImageCardSizeContext.Provider;

    parentDivRef = React.createRef();
    imageRef = React.createRef();

    updateContextHeight = (value, setValue) => {
        const { height } = this.parentDivRef.current.getBoundingClientRect();

        if (value === defaultContextValue || value > height) {
            setValue(height);
        }
    };

    renderHoverContent() {
        const { title, description, smallTextMargins } = this.props;
        const positionCls = 'position-absolute fixed-top h-100';
        const animationCls = 'duration-5 linear';
        // Mobile browsers between phone and tablet look strange when using the media query for xs/sm
        // so force all mobile browsers to use the mobile view
        const marginCls = isMobileBrowser() || smallTextMargins ? ['mt-10p mb-5p ml-1', 'mx-5p'] : ['m-5', 'm-3'];
        const Title = isMobileBrowser() ? 'h4' : 'h3';

        return (
            <Hooked hook={useHover}>
                {([ ref, isHovered ]) => {
                    const hoverCls = isHovered ? ['show', 'slide-in-top', 'slide-in-bottom'] : ['', '', ''];
                    const defaultWidth = 'auto';
                    const width = validateObjNestedFields(this.imageRef, 'current')
                        ? this.imageRef.current.getBoundingClientRect().width || defaultWidth
                        : defaultWidth;

                    return (
                        <div
                            className={`bg-primary margin-center animated fade-in text-light ${positionCls} ${animationCls} ${hoverCls[0]}`}
                            ref={ref}
                            style={{ width }}
                        >
                            <Title className={`${marginCls[0]} ${animationCls} ${hoverCls[1]}`}>
                                {title}
                            </Title>
                            <p className={`${marginCls[1]} ${animationCls} ${hoverCls[2]}`}>
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
            <ImageCard.SameHeightConsumer>
                {({ value, setValue }) => (
                    <div className={this.props.className} ref={this.parentDivRef} {...this.props.aria}>
                        {/* Obey parent's padding with `position: relative` */}
                        <div className={'position-relative w-100'} style={{ height: `${value}px`, overflow: 'hidden' }}>
                            <Image
                                className={this.props.imageCls}
                                image={this.props.image}
                                onLoad={() => this.updateContextHeight(value, setValue)}
                                aria={{ ref: this.imageRef }}
                            />
                            {this.renderHoverContent()}
                        </div>
                    </div>
                )}
            </ImageCard.SameHeightConsumer>
        );
    }
}

ImageCard.propTypes = {
    className: PropTypes.string,
    image: PropTypes.string,
    imageCls: PropTypes.string,
    title: PropTypes.node,
    description: PropTypes.node,
    smallTextMargins: PropTypes.bool,
    aria: PropTypes.object
};

ImageCard.defaultProps = {
    className: '',
    image: '',
    imageCls: '',
    title: '',
    description: '',
    smallTextMargins: false,
    aria: {}
};

export default ImageCard;
