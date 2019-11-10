import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/ui/Image';
import { useHover } from 'utils/Hooks';
import ContextFactory from 'utils/Context';
import { isMobileBrowser, validateObjNestedFields } from 'utils/Functions';

function ImageCard({ className, image, imageCls, title, description, aria }) {
    const parentDivRef = React.createRef();
    const imageRef = React.createRef();
    const [ hoverRef, isHovered ] = useHover();

    function updateContextHeight(contextImgHeight, setContextImgHeight) {
        const { height } = parentDivRef.current.getBoundingClientRect();

        if (contextImgHeight === defaultContextImgHeight || contextImgHeight > height) {
            setContextImgHeight(height);
        }
    }

    function renderHoverContent() {
        const positionCls = 'position-absolute fixed-top h-100';
        const animationCls = 'duration-5 linear';
        // Mobile browsers between phone and tablet look strange when using the media query for xs/sm
        // so force all mobile browsers to use the mobile view
        const marginCls = isMobileBrowser() ? ['mt-10p mb-5p ml-1', 'mx-5p'] : ['m-5', 'm-3'];
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
        <ImageCard.SameHeightConsumer>
            {({ value: contextImgHeight, setValue: setContextImgHeight }) => (
                <div className={className} ref={parentDivRef} {...aria}>
                    {/* Obey parent's padding with `position: relative` */}
                    <div className={'position-relative w-100'} style={{ height: `${contextImgHeight}px`, overflow: 'hidden' }}>
                        <Image
                            className={imageCls}
                            image={image}
                            onLoad={() => updateContextHeight(contextImgHeight, setContextImgHeight)}
                            aria={{ ref: imageRef }}
                        />
                        {renderHoverContent()}
                    </div>
                </div>
            )}
        </ImageCard.SameHeightConsumer>
    );
}

const defaultContextImgHeight = 'auto';
const ImageCardSizeContext = ContextFactory(defaultContextImgHeight);

ImageCard.SameHeightConsumer = ImageCardSizeContext.Consumer;
ImageCard.SameHeightProvider = ImageCardSizeContext.Provider;

ImageCard.propTypes = {
    className: PropTypes.string,
    image: PropTypes.string,
    imageCls: PropTypes.string,
    title: PropTypes.node,
    description: PropTypes.node,
    aria: PropTypes.object
};

ImageCard.defaultProps = {
    className: '',
    image: '',
    imageCls: '',
    title: '',
    description: '',
    aria: {}
};

export default ImageCard;
