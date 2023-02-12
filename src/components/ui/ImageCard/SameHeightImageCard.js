import React, { useState, useEffect, useContext } from 'react';

import ContextFactory from '@/utils/ContextFactory';
import { validateObjNestedFields } from '@/utils/Objects';
import { useWindowResize } from '@/utils/Hooks';

import ImageCard from './ImageCard';

const ImageCardSizeContext = ContextFactory([]);
const { Provider, Context } = ImageCardSizeContext;

function SameHeightImageCard({ imageAria, imageStyle, onLoad, ...imageCardProps }) {
    const imageRef = React.createRef();
    const [ imageIndex, setImageIndex ] = useState();
    const { contextState: allImageHeights, setContextState } = useContext(Context);

    // don't sort in-place/maintain index vals
    const getSmallestImageHeightFromContext = () => Math.min(...allImageHeights);
    const addImageHeightToContext = height => setContextState(prevState => {
        const newImageHeights = [...prevState];

        newImageHeights.push(height);

        return newImageHeights;
    });
    const updateImageHeightInContext = (index, height) => setContextState(prevState => {
        const newImageHeights = [...prevState];

        newImageHeights[index] = height;

        return newImageHeights;
    });

    function getMountedImageHeight() {
        const imageMounted = validateObjNestedFields(imageRef, 'current');

        if (imageMounted) {
            const imageElement = imageRef.current;
            const { height } = imageElement.getBoundingClientRect();

            return height;
        }
    }

    function addMountedImageHeightToContext() {
        const height = getMountedImageHeight();

        if (height != null) {
            addImageHeightToContext(height);
        }
    }

    const handleOnLoad = e => {
        onLoad(e);
        setImageIndex(allImageHeights.length);
        addMountedImageHeightToContext();
    };

    const [ windowSizeState, resetWasResized ] = useWindowResize();

    useEffect(() => {
        const windowWidthChanged = windowSizeState.prevWidth !== window.innerWidth;

        if (windowSizeState.wasResized && windowWidthChanged) {
            updateImageHeightInContext(imageIndex, getMountedImageHeight());

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
