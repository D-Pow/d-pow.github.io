import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/ui/Image';
import { useHover } from 'utils/Hooks';
import { isMobileBrowser, validateObjNestedFields } from 'utils/Functions';

function ImageCard({ className, image, imageCls, imageStyle, title, description, aria, onLoad }) {
    const imageRef = React.createRef();
    const [ hoverRef, isHovered ] = useHover();

    function renderHoverContent() {
        const positionCls = 'position-absolute fixed-top h-100';
        const animationCls = 'duration-5 linear';
        // Mobile browsers between phone and tablet look strange when using the media query for xs/sm
        // so force all mobile browsers to use the mobile view
        const marginCls = isMobileBrowser() ? ['mt-10p mb-5p ml-1', 'mx-5p'] : ['mt-5 mb-3', 'm-3'];
        const Title = isMobileBrowser() ? 'h4' : 'h3';
        const hoverCls = isHovered ? ['show', 'slide-in-top', 'slide-in-bottom'] : ['', '', ''];
        const defaultWidth = 'auto';
        const width = validateObjNestedFields(imageRef, 'current')
            ? imageRef.current.getBoundingClientRect().width
            : defaultWidth;

        return (
            <div
                className={`bg-primary margin-center animated fade-in text-light ${positionCls} ${animationCls} ${hoverCls[0]}`}
                ref={hoverRef}
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
    }

    return (
        <div className={className} {...aria}>
            {/* Obey parent's padding with `position: relative` */}
            <div className={'position-relative w-100'} style={imageStyle}>
                <Image
                    className={imageCls}
                    image={image}
                    onLoad={onLoad}
                    aria={{ ref: imageRef }}
                />
                {renderHoverContent()}
            </div>
        </div>
    );
}

ImageCard.propTypes = {
    className: PropTypes.string,
    image: PropTypes.string,
    imageCls: PropTypes.string,
    imageStyle: PropTypes.object,
    title: PropTypes.node,
    description: PropTypes.node,
    aria: PropTypes.object,
    onLoad: PropTypes.func
};

ImageCard.defaultProps = {
    className: '',
    image: '',
    imageCls: '',
    imageStyle: {},
    title: '',
    description: '',
    aria: {},
    onLoad: () => {}
};

export default ImageCard;
