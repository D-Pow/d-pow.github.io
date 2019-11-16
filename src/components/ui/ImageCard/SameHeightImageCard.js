import React, { useContext } from 'react';
import ImageCard from './ImageCard';
import ContextFactory from 'utils/Context';
import { validateObjNestedFields } from 'utils/Functions';

const defaultContextImgHeight = 'auto';
const ImageCardSizeContext = ContextFactory(defaultContextImgHeight);
const { Provider, Context } = ImageCardSizeContext;

function SameHeightImageCard(imageCardProps) {
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

    return (
        <ImageCard
            {...imageCardProps}
            imageStyle={{ height: `${contextImgHeight}px`, overflow: 'hidden' }}
            imageAria={{ ref: imageRef }}
            onLoad={shrinkContextHeightToSmallestImage}
        />
    );
}

SameHeightImageCard.Provider = Provider;

SameHeightImageCard.propTypes = ImageCard.propTypes;
SameHeightImageCard.defaultProps = ImageCard.defaultProps;

export default SameHeightImageCard;
