import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/ui/Image';
import { useHover } from 'utils/Hooks';
import { isMobileBrowser } from 'utils/Functions';

function ImageCard(props) {
    const {
        centerInWrapper,
        className,
        wrapperCls,
        image,
        imageCls,
        imageStyle,
        imageAria,
        title,
        description,
        aria,
        widthFit,
        onLoad
    } = props;
    const { ref, ...restOfImageAria } = imageAria;
    const imageRef = ref || React.createRef();
    const [ hoverRef, isHovered ] = useHover();

    function renderHoverContent() {
        const textWrapperColorCls = 'bg-primary text-light';
        const textWrapperPositionCls = 'position-absolute m-auto fixed-top h-100';
        const textWrapperChildrenPositioningCls = 'd-flex align-content-evenly flex-wrap';
        const textWrapperAnimationCls = 'animated fade';
        const textWrapperCls = [
            textWrapperColorCls,
            textWrapperPositionCls,
            textWrapperChildrenPositioningCls,
            textWrapperAnimationCls
        ].join(' ');

        const animationCls = 'duration-5 linear';
        const Title = isMobileBrowser(true) ? 'h4' : 'h3';
        const titleSizeCls = `font-size-${isMobileBrowser(true) ? 3 : 4}vh`;
        const hoverCls = isHovered ? ['show', 'slide-in-top', 'slide-in-bottom'] : ['', '', ''];

        return (
            <div
                className={`${textWrapperCls} ${animationCls} ${hoverCls[0]}`}
                ref={hoverRef}
            >
                <Title className={`mx-auto mt-3 ${animationCls} ${hoverCls[1]} ${titleSizeCls}`}>
                    {title}
                </Title>
                <div className={`mx-auto ${animationCls} ${hoverCls[2]} font-size-2-5vh`}>
                    <p className={'mx-3'}>
                        {description}
                    </p>
                </div>
            </div>
        );
    }

    // Obey parent's padding with `position-relative`
    // Fill as much of the space as possible with `width-fit`
    // Center image within wrapper (in the event the image is smaller than wrapper) with `m-auto`
    const centerCls = centerInWrapper ? 'm-auto' : '';
    const containerCls = `position-relative ${widthFit} ${centerCls} ${mobileBoxShadowCls} ${className}`;

    return (
        <div className={wrapperCls} {...aria}>
            <div className={containerCls} style={imageStyle}>
                <Image
                    className={`w-100 ${imageCls}`}
                    image={image}
                    onLoad={onLoad}
                    aria={{ ref: imageRef, ...restOfImageAria }}
                />
                {renderHoverContent()}
            </div>
        </div>
    );
}

ImageCard.WidthFits = {
    FIT: 'width-fit',
    STRETCH: 'w-100'
};

ImageCard.propTypes = {
    centerInWrapper: PropTypes.bool,
    className: PropTypes.string,
    wrapperCls: PropTypes.string,
    image: PropTypes.string,
    imageCls: PropTypes.string,
    imageStyle: PropTypes.object,
    imageAria: PropTypes.object,
    title: PropTypes.node,
    description: PropTypes.node,
    aria: PropTypes.object,
    widthFit: PropTypes.oneOf(Object.values(ImageCard.WidthFits)),
    onLoad: PropTypes.func
};

ImageCard.defaultProps = {
    centerInWrapper: true,
    className: '',
    wrapperCls: '',
    image: '',
    imageCls: '',
    imageStyle: {},
    imageAria: {},
    title: '',
    description: '',
    aria: {},
    widthFit: ImageCard.WidthFits.FIT,
    onLoad: () => {}
};

export default ImageCard;
