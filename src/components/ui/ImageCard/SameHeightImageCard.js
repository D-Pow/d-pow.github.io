import React from 'react';
import ImageCard from './ImageCard';
import ContextFactory from 'utils/Context';
import { validateObjNestedFields } from 'utils/Functions';

const defaultContextImgHeight = 'auto';
const ImageCardSizeContext = ContextFactory(defaultContextImgHeight);
const { Provider, Consumer } = ImageCardSizeContext;

function SameHeightImageCard(imageCardProps) {
    const parentDivRef = React.createRef();

    function updateContextHeight(contextImgHeight, setContextImgHeight) {
        if (validateObjNestedFields(parentDivRef, 'current')) {
            const { height } = parentDivRef.current.getBoundingClientRect();

            if (contextImgHeight === defaultContextImgHeight || contextImgHeight > height) {
                setContextImgHeight(height);
            }
        }
    }

    return (
        <Consumer>
            {({ value: contextImgHeight, setValue: setContextImgHeight }) => (
                <ImageCard
                    {...imageCardProps}
                    aria={{ ref: parentDivRef }}
                    imageStyle={{ height: `${contextImgHeight}px`, overflow: 'hidden' }}
                    onLoad={() => updateContextHeight(contextImgHeight, setContextImgHeight)}
                />
            )}
        </Consumer>
    );
}

SameHeightImageCard.Provider = Provider;

SameHeightImageCard.propTypes = ImageCard.propTypes;
SameHeightImageCard.defaultProps = ImageCard.defaultProps;

export default SameHeightImageCard;
