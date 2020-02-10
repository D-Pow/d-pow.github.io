import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/ui/Image';
import { useHover } from 'utils/Hooks';
import { isMobileBrowser, isMicrosoftBrowser } from 'utils/Functions';

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
        widthFit,
        showBorder,
        aria,
        onLoad
    } = props;
    const { ref, ...restOfImageAria } = imageAria;
    const imageRef = ref || React.createRef();
    const [ hoverRef, isHovered ] = useHover();

    function renderHoverContent() {
        const textWrapperColorCls = 'bg-primary text-light';
        const textWrapperPositionCls = 'position-absolute m-auto fixed-top h-100';
        const textWrapperChildrenPositioningCls = 'd-flex flex-wrap ' + (isMicrosoftBrowser() ? 'align-content-space-around' : 'align-content-evenly');
        const textWrapperAnimationCls = 'animated fade';
        const textWrapperCls = [
            textWrapperColorCls,
            textWrapperPositionCls,
            textWrapperChildrenPositioningCls,
            textWrapperAnimationCls
        ].join(' ');

        const animationCls = 'duration-5 linear';
        const Title = isMobileBrowser({ includeTablets: true }) ? 'h4' : 'h3';
        const titleSizeCls = `font-size-${isMobileBrowser({ includeTablets: true }) ? '1-5' : '2'}em`;
        const hoverCls = isHovered ? ['show', 'slide-in-top', 'slide-in-bottom'] : ['', '', ''];

        return (
            <div
                className={`${textWrapperCls} ${animationCls} ${hoverCls[0]}`}
                ref={hoverRef}
            >
                <Title className={`w-100 mx-auto mt-3 ${animationCls} ${hoverCls[1]} ${titleSizeCls}`}>
                    {title}
                </Title>
                <div className={`mx-auto ${animationCls} ${hoverCls[2]} font-size-1em`}>
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
    const isMobileBrowserWithXsScreen = isMobileBrowser({ onlyXsScreenSizes: true });
    const mobileShadowAndBorderCls = isMobileBrowserWithXsScreen || showBorder
        ? 'box-shadow-sm border border-medium border-primary-opacity-4'
        : '';
    const width = isMobileBrowserWithXsScreen ? ImageCard.WidthFits.DYNAMIC_MOBILE : widthFit;
    const containerCls = `position-relative ${width} ${centerCls} ${mobileShadowAndBorderCls} ${className}`;

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
    STRETCH: 'w-100',
    DYNAMIC_MOBILE: 'w-90'
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
    showBorder: PropTypes.bool,
    widthFit: PropTypes.oneOf(Object.values(ImageCard.WidthFits)),
    aria: PropTypes.object,
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
    showBorder: false,
    widthFit: ImageCard.WidthFits.FIT,
    aria: {},
    onLoad: () => {}
};

export default ImageCard;
