import React, { useContext } from 'react';
import ImageCard from './ImageCard';
import ContextFactory from 'utils/ContextFactory';
import { validateObjNestedFields } from 'utils/Functions';

const defaultContextImgHeight = 'auto';
const ImageCardSizeContext = ContextFactory(defaultContextImgHeight);
const { Provider, Context } = ImageCardSizeContext;

function SameHeightImageCard({ imageAria, imageStyle, onLoad, ...imageCardProps }) {
    const imageRef = React.createRef();
    const { contextState: contextImgHeight, setContextState: setContextImgHeight } = useContext(Context);

    function shrinkContextHeightToSmallestImage() {
        const imageMounted = validateObjNestedFields(imageRef, 'current');

        if (imageMounted) {
            const imageElement = imageRef.current;
            const { height } = imageElement.getBoundingClientRect();

            if (contextImgHeight === defaultContextImgHeight || contextImgHeight > height) {
                setContextImgHeight(height);
            }
        }
    }

    const handleOnLoad = e => {
        if (typeof onLoad === typeof (() => {})) {
            onLoad(e);
        }

        shrinkContextHeightToSmallestImage(e);
    };

    return (
        <ImageCard
            {...imageCardProps}
            imageStyle={{ height: `${contextImgHeight}px`, overflow: 'hidden', ...imageStyle }}
            imageAria={{ ref: imageRef, ...imageAria }}
            onLoad={handleOnLoad}
        />
    );
}

SameHeightImageCard.Provider = Provider;

SameHeightImageCard.WidthFits = ImageCard.WidthFits;
SameHeightImageCard.propTypes = ImageCard.propTypes;
SameHeightImageCard.defaultProps = ImageCard.defaultProps;

export default SameHeightImageCard;
