import React, { useEffect, useContext, useCallback } from 'react';

import ContextFactory from '@/utils/ContextFactory';
import { useWindowResize } from '@/utils/Hooks';

import ImageCard from './ImageCard';

const ImageCardSizeContext = ContextFactory({});
const { Provider, Context } = ImageCardSizeContext;


function getMountedImageHeight(elemRef) {
    return elemRef?.current?.getBoundingClientRect?.().height;
}

function SameHeightImageCard({ imageAria, imageStyle, onLoad, ...imageCardProps }) {
    const imageRef = React.createRef();
    const { contextState: allImageHeights, setContextState } = useContext(Context);

    const getSmallestImageHeightFromContext = () => Math.min(...Object.values(allImageHeights));
    const updateImageHeightInContext = useCallback((imageId, height) => setContextState(prevState => {
        const newImageHeights = { ...prevState };

        if (height) {
            newImageHeights[imageId] = height;
        } else {
            delete newImageHeights[imageId];
        }

        return newImageHeights;
    }), [ setContextState ]);

    const handleOnLoad = useCallback(e => {
        onLoad(e);
        updateImageHeightInContext(imageCardProps.image, getMountedImageHeight(imageRef));
    }, [ onLoad, imageCardProps.image, imageRef, updateImageHeightInContext ]);

    const [ windowSizeState, resetWasResized ] = useWindowResize();

    useEffect(() => {
        const windowWidthChanged = windowSizeState.prevWidth !== window.innerWidth;

        if (windowSizeState.wasResized && windowWidthChanged) {
            updateImageHeightInContext(imageCardProps.image, getMountedImageHeight(imageRef));

            resetWasResized();
        }
    }, [ windowSizeState.wasResized, windowSizeState.prevWidth ]);

    return (
        <ImageCard
            {...imageCardProps}
            imageStyle={{ height: `${getSmallestImageHeightFromContext()}px`, overflow: 'hidden', ...imageStyle }}
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
