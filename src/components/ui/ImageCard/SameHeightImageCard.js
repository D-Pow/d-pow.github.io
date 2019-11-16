import React, { useContext } from 'react';
import ImageCard from './ImageCard';
import ContextFactory from 'utils/Context';
import { validateObjNestedFields } from 'utils/Functions';

const defaultContextImgHeight = 'auto';
const ImageCardSizeContext = ContextFactory(defaultContextImgHeight);
const { Provider, Context } = ImageCardSizeContext;

function SameHeightImageCard(imageCardProps) {
    const parentDivRef = React.createRef();
    const { contextState: contextImgHeight, setContextState: setContextImgHeight } = useContext(Context);

    function shrinkContextHeightToSmallestImage() {
        if (validateObjNestedFields(parentDivRef, 'current')) {
            const { height } = parentDivRef.current.getBoundingClientRect();

            if (contextImgHeight === defaultContextImgHeight || contextImgHeight > height) {
                setContextImgHeight(height);
            }
        }
    }

    return (
        <ImageCard
            {...imageCardProps}
            aria={{ ref: parentDivRef }}
            imageStyle={{ height: `${contextImgHeight}px`, overflow: 'hidden' }}
            onLoad={shrinkContextHeightToSmallestImage}
        />
    );
}

SameHeightImageCard.Provider = Provider;

SameHeightImageCard.propTypes = ImageCard.propTypes;
SameHeightImageCard.defaultProps = ImageCard.defaultProps;

export default SameHeightImageCard;
