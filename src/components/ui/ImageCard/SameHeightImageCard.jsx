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
        <>
            <ImageCard
                {...imageCardProps}
                imageStyle={{ height: `${getSmallestImageHeightFromContext()}px`, overflow: 'hidden', ...imageStyle }}
                imageAria={imageAria}
                onLoad={handleOnLoad}
            />
            <ImageCard
                /*
                 * Create ghost element to get the exact, correct size the image would be without height restrictions,
                 * so we can use that height as our basis for the same-height calculations, rather than using the
                 * previously-shrunk height that biases subsequent same-height calculations.
                 *
                 * See:
                 *  - https://stackoverflow.com/questions/60235415/how-do-i-make-images-the-same-height-in-a-flexbox-side-by-side-without-knowing
                 *  - https://stackoverflow.com/questions/47236454/css-flexbox-organizing-flex-items-based-on-screen-size
                 */
                // Use same props and styles as the actually-rendered content to mimic the same behaviors.
                {...imageCardProps}
                // Set `position: absolute` on this ghost since `visibility: hidden` makes the element take up space
                // in the display layout (i.e. they take up space).
                // Note: Centering it is fine since this component is only ever used in a `.col` parent wrapper,
                // however we might need to revisit this in the future if that fact changes.
                wrapperCls={`${imageCardProps.wrapperCls} absolute-center`}
                imageStyle={{
                    // Use `height: auto` to obtain the largest possible height the image could be.
                    height: 'auto',
                    overflow: 'hidden',
                    ...imageStyle,
                    // Hide this element from display, but allow it to take up space since we need it to take up
                    // space in order to get the height it would be normally.
                    visibility: 'hidden',
                }}
                // Attach the ref here so this ghost image's height is what's used in calculations.
                // Otherwise, the shown image will just continue to get smaller and smaller with every window-size change
                // due to our `height: getSmallestImageHeightFromContext()` styling in the shown, "real" image.
                imageAria={{ ref: imageRef, ...imageAria }}
                showHoverContent={false}
            />
        </>
    );
}

SameHeightImageCard.Provider = Provider;

SameHeightImageCard.WidthFits = ImageCard.WidthFits;
SameHeightImageCard.propTypes = ImageCard.propTypes;
SameHeightImageCard.defaultProps = ImageCard.defaultProps;

export default SameHeightImageCard;
