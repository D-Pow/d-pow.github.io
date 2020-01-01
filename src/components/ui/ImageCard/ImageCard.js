import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/ui/Image';
import { useHover } from 'utils/Hooks';
import { isMobileBrowser } from 'utils/Functions';

function ImageCard(props) {
    const {
        centerInWrapper,
        className,
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
        const textWrapperPositionCls = 'position-absolute margin-center fixed-top h-100';
        const textWrapperAnimationCls = 'animated fade-in';
        const textWrapperCls = `${textWrapperColorCls} ${textWrapperPositionCls} ${textWrapperAnimationCls}`;
        const animationCls = 'duration-5 linear';
        // Mobile browsers between phone and tablet look strange when using the media query for xs/sm
        // so force all mobile browsers to use the mobile view
        const marginCls = isMobileBrowser() ? ['mt-10p mb-5p ml-1', 'mx-5p'] : ['mt-5 mb-3', 'm-3'];
        const Title = isMobileBrowser() ? 'h4' : 'h3';
        const hoverCls = isHovered ? ['show', 'slide-in-top', 'slide-in-bottom'] : ['', '', ''];

        return (
            <div
                className={`${textWrapperCls} ${animationCls} ${hoverCls[0]}`}
                ref={hoverRef}
            >
                <Title className={`${marginCls[0]} ${animationCls} ${hoverCls[1]} font-size-4vh`}>
                    {title}
                </Title>
                <p className={`${marginCls[1]} ${animationCls} ${hoverCls[2]} font-size-2-5vh`}>
                    {description}
                </p>
            </div>
        );
    }

    // Obey parent's padding with `position-relative`
    // Fill as much of the space as possible with `width-fit`
    // Center image within wrapper (in the event the image is smaller than wrapper) with `margin-center`
    const wrapperCls = `position-relative ${widthFit} ${centerInWrapper ? 'margin-center' : ''}`;

    return (
        <div className={className} {...aria}>
            <div className={wrapperCls} style={imageStyle}>
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
