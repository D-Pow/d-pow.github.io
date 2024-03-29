import {
    useState,
    useEffect,
    useCallback,
    useReducer,
    useRef,
} from 'react';

import { asNumber } from '@/utils/Numbers';
import { debounce, elementIsInClickPath, getClickPath, setDocumentScrolling } from '@/utils/Events';

/**
 * @callback hookedChildRenderer
 * @param {(*|Array<*>)} hookReturnVal - Value returned from useMyHook()
 * @returns {React.Component} - Children to render using hookReturnVal
 */
/**
 * Component used when class components want to use hooks.
 *
 * @param {Object} props - Props for returned React.Component
 * @param {function} props.hook - Hook to use within class component
 * @param {Array<*>} [props.hookArgs=[]] - Arguments to pass to `props.hook`
 * @param {hookedChildRenderer} props.children - Function that uses value from hook() to render children; passed as React.Component.props
 * @returns {React.Component} - Children rendered using the hook() return values
 */
export function Hooked({ hook, hookArgs = [], children }) {
    return children(hook(...hookArgs));
}

/**
 * @callback hookModifiedForGlobalState
 * @param {*} origHookParams - Parameters for the original hook, passed by calling component.
 * @param {*} globalHookState - The global state for all hook instances.
 * @param {number} hookCallerId - Unique ID of the parent that is calling the hook.
 * @returns {*} - Value returned from original hook.
 */
/**
 * @callback setGlobalStateForWrappedHook
 * @param {*} globalHookState - The global state for all hook instances.
 * @param {function} setGlobalHookState - Standard {@link useState} {@code setState} function.
 * @param {*} hookReturnVal - Return value of passed {@code hook}.
 * @param {number} hookCallerId - Unique ID of the parent that is calling the hook.
 * @returns {undefined}
 */
/**
 * Wraps a hook such that all hook instances can access a single global
 * state. Returns the original hook that accepts caller arguments
 * as well as global state arguments.
 *
 * @param {hookModifiedForGlobalState} hook - The hook to wrap.
 * @param {setGlobalStateForWrappedHook} setGlobalState - {@code setState} function for global state.
 * @param {*} initialGlobalStateVal - Initial value for global state.
 * @returns {function} - The original hook wrapped with global state functionality.
 */
export function withGlobalState(hook, setGlobalState, initialGlobalStateVal) {
    /*
     * Mimic `useState` since this isn't a hook.
     * This will still cause React to re-render if `globalHookState` changes because the
     * passed `hook` is modified to read and react to its value.
     */
    let globalHookState = initialGlobalStateVal;

    function setGlobalHookState(newState) {
        if (typeof newState === typeof withGlobalState) {
            globalHookState = newState(globalHookState);
        } else {
            globalHookState = newState;
        }
    }

    return (...hookArgs) => {
        // Assign a unique ID to each hook caller in the event
        // that the wrapped hook needs to know which caller it is
        const [ hookCallerId ] = useState(Math.random());
        const hookReturnVal = hook(...hookArgs, globalHookState, hookCallerId);

        setGlobalState(
            globalHookState,
            setGlobalHookState,
            hookReturnVal,
            hookCallerId,
        );

        return hookReturnVal;
    };
}

/**
 * Custom state handler function for useWindowEvent()
 *
 * @callback handleWindowEvent
 * @param {*} prevState - Previous state
 * @param {function} setState - setState() React function
 * @param {*} newEvent - New event from window
 */
/**
 * Adds an event listener to the window and returns the associated eventState/setEventState fields.
 * Optional configurations include using a nested event field for state, setting the initial state,
 * and using a custom event handler instead of the standard setEventState(newEventState).
 *
 * @param {string} eventType - Type of event, passed to `window.addEventListener(eventType, ...)`
 * @param {string} [nestedEventField=null] - Nested event field to use as state instead of the event itself
 * @param {*} [initialEventState=null] - Initial state to use in event listener
 * @param {handleWindowEvent} [handleEvent=null] - Custom event handler to use instead of standard setEventState
 * @param {Array<*>} [useEffectInputs=[]] - useEffect optimization inputs: `useEffect(func, useEffectInputs)`
 * @returns {[ *, function ]} - event state and respective setState function
 */
export function useWindowEvent(
    eventType,
    {
        nestedEventField = null,
        initialEventState = null,
        handleEvent = null,
        useEffectInputs = [],
    } = {},
) {
    const [ eventState, setEventState ] = useState(initialEventState);
    const isUsingOwnEventHandler = typeof handleEvent === typeof setEventState;

    function eventListener(event) {
        const newEventState = nestedEventField ? event[nestedEventField] : event;

        if (isUsingOwnEventHandler) {
            handleEvent(setEventState, newEventState);
        } else {
            setEventState(newEventState);
        }
    }

    useEffect(() => {
        window.addEventListener(eventType, eventListener);

        return () => {
            window.removeEventListener(eventType, eventListener);
        };
    }, useEffectInputs);

    return [ eventState, setEventState ];
}

export function useKeyboardEvent(type = 'down') {
    return useWindowEvent(`key${type}`, { nestedEventField: 'key' });
}

/**
 * Get a hook state array containing the path from the clicked element to the root.
 *
 * @returns {[ [HTMLElement] | function ]} - The click path and setter function for said path
 */
export function useClickPath() {
    const [ event, setEvent ] = useWindowEvent('click');
    const clickPath = getClickPath(event);

    return [ clickPath, setEvent ]; // setEvent will be used as setClickPath
}

/**
 * A root-close hook that triggers closing an element based on if the user clicks outside the bounds
 * of the acceptable element or if they press the "Escape" key
 *
 * @param {ElementProps} acceptableElement - Element that marks the bounds of what is acceptable to click on
 * @param {ElementProps} closeElement - Element that marks the bounds of what should trigger the root close
 * @returns {[boolean, function]} - If the user triggered the root close and the function to reset the trigger
 */
export function useRootClose(acceptableElement, closeElement) {
    const [ keyDown, setKeyDown ] = useKeyboardEvent();
    const [ clickPath, setClickPath ] = useClickPath();

    const pressedEscape = keyDown === 'Escape';
    const clickedOnElementWithinBounds = elementIsInClickPath(acceptableElement, clickPath);
    const clickedOnElementOutsideBounds = elementIsInClickPath(closeElement, clickPath);
    const rootWasClosed = pressedEscape || (clickedOnElementOutsideBounds && !clickedOnElementWithinBounds);

    const resetRootClosed = () => {
        setKeyDown(null);
        setClickPath([]);
    };

    return [ rootWasClosed, resetRootClosed ];
}

/**
 * Hook to determine if the window was resized and the previous
 * innerWidth/innerHeight values on resize.
 *
 * @param {number} debounceDelay - How long to debounce resize event before firing setState()
 * @returns {[{ wasResized: boolean, prevWidth: number, prevHeight: number}, function ]}
 */
export function useWindowResize(debounceDelay = 1000) {
    const generateInitialState = () => ({
        wasResized: false,
        prevWidth: window.innerWidth,
        prevHeight: window.innerHeight,
    });

    function handleResize(setState) {
        setState(prevState => ({
            ...prevState,
            wasResized: true,
        }));
    }

    const [ windowSizeState, setWindowSizeState ] = useWindowEvent('resize', {
        initialEventState: generateInitialState(),
        handleEvent: debounce(handleResize, debounceDelay),
    });

    function resetWasResized() {
        setWindowSizeState(generateInitialState());
    }

    return [ windowSizeState, resetWasResized ];
}

/**
 * Blocks the `document.body` from being scrollable as long as the
 * `shouldBlockScrolling` function returns true.
 *
 * Keeps track of all other `useBlockDocumentScrolling()` instances such
 * that even if one instance returns false, the `document.body` is still not
 * scrollable if another returns true.
 *
 * @function
 * @param {function(): boolean} shouldBlockScrolling - Function to determine if scrolling should be disabled.
 */
export const useBlockDocumentScrolling = (() => {
    function useBlockDocumentScrollingHook(shouldBlockScrolling, allHooksBlockingScrollingGlobalState, id) {
        /**
         * Don't return a cleanup function to handle activating scrolling.
         *
         * React calls cleanup functions upon both component unmount
         * and component re-render.
         *
         * If re-activating scrolling were returned in the cleanup function,
         * then anytime the component re-rendered, document scrolling
         * would be re-activated, even if the `shouldBlockScrolling()` returned true.
         *
         * Thus, handle the cleanup manually in else-block.
         */
        const blockScrolling = shouldBlockScrolling();
        const otherHooksBlockingScrolling = allHooksBlockingScrollingGlobalState
            .filter(entry => entry.id !== id)
            .some(entry => entry.isBlockingScrolling);

        useEffect(() => {
            if (blockScrolling) {
                setDocumentScrolling(false);
            } else if (!otherHooksBlockingScrolling) {
                setDocumentScrolling();
            }
        }, [ blockScrolling, otherHooksBlockingScrolling ]);

        return blockScrolling;
    }

    function setTrackAllHookCallsState(prevGlobalState, setGlobalState, hookReturnVal, id) {
        const thisHookEntry = prevGlobalState.find(entries => entries.id === id);

        if (thisHookEntry == null) {
            prevGlobalState.push({ id, isBlockingScrolling: hookReturnVal });
            setGlobalState(prevGlobalState);
        } else if (thisHookEntry.isBlockingScrolling !== hookReturnVal) {
            thisHookEntry.isBlockingScrolling = hookReturnVal;
            setGlobalState(prevGlobalState);
        }
    }

    return withGlobalState(
        useBlockDocumentScrollingHook,
        setTrackAllHookCallsState,
        [],
    );
})();

/**
 * Determines if the mouse is hovering over an element using JavaScript.
 * Useful for the times where JavaScript calculations need to be done,
 * where CSS `:hover` classes aren't enough.
 *
 * Optionally, `overrideBoundingClientRect` will allow the use of a different
 * `getBoundingClientRect()` object instead of the one from the returned React.ref.
 * This field will generally only be useful if you need to know if an element inside
 * an SVG is hovered over because `svgElement.getBoundingClientRect()` will return
 * a rect relative to the SVG, not the window. In this case, manual bounding-rect
 * calculations will need to be done on the SVG element to convert it from the SVG's
 * viewport to the window's.
 *
 * @param {Object} [overrideBoundingClientRect=null] - Optional `getBoundingClientRect()` result to use instead of the returned ref
 * @returns {[React.ref, boolean]} - The ref to attach to the element watching for a hover and the respective `isHovered` value
 */
export function useHover(overrideBoundingClientRect) {
    const ref = useRef(overrideBoundingClientRect);

    function handleMouseMove(setIsHovered, newEvent) {
        const { pageX, pageY } = newEvent;

        if (ref.current) {
            const { pageXOffset, pageYOffset } = window;
            let { top, bottom, left, right } = overrideBoundingClientRect || ref.current.getBoundingClientRect();

            top = top + pageYOffset;
            bottom = bottom + pageYOffset;
            left = left + pageXOffset;
            right = right + pageXOffset;

            if (pageX <= right && pageX >= left && pageY <= bottom && pageY >= top) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        }
    }

    const [ isHovered ] = useWindowEvent('mousemove', {
        initialEventState: false,
        handleEvent: handleMouseMove,
        useEffectInputs: [ ref.current, overrideBoundingClientRect ],
    });

    return [ ref, isHovered ];
}

/**
 * Returns an array of false booleans that will toggle to true one after another
 * according to the specified `intervalTimeMs`.
 * Optionally allows toggling back from true -> false
 *
 * @param {number} arrayLength - How many entries should be in the toggle array
 * @param {number} intervalTimeMs - How much time should pass before toggling the next entry
 * @param {boolean} [allowBackwardsToggle=false] - Allow array toggle to be able to trigger in both directions, false <-> true
 * @returns {[ boolean[], Function ]} - An array of booleans to toggle and a function to initiate array toggling
 */
export function useTimedArrayToggle(arrayLength, intervalTimeMs, allowBackwardsToggle = false) {
    const toggleArrayEntryReducer = useCallback((prevArray, index) => {
        const toggledEntries = [ ...prevArray ];
        toggledEntries[index] = !toggledEntries[index];
        return toggledEntries;
    }, []);

    const origState = Array.from({ length: arrayLength }).fill(false);

    const [ toggledEntries, dispatchToggleEntry ] = useReducer(toggleArrayEntryReducer, origState);
    const [ shouldToggleEntries, setShouldToggleEntries ] = useState(false);
    const [ timeoutTriggered, setTimeoutTriggered ] = useState(false);

    const resetTimeoutTrigger = () => {
        if (allowBackwardsToggle) {
            setTimeout(() => {
                setShouldToggleEntries(false);
                setTimeoutTriggered(false);
            }, arrayLength * intervalTimeMs);
        }
    };

    if (shouldToggleEntries && !timeoutTriggered) {
        setTimeoutTriggered(true);

        for (let i = 0; i < arrayLength; i++) {
            const timeToShow = intervalTimeMs*i;

            setTimeout(() => {
                dispatchToggleEntry(i);
            }, timeToShow);
        }

        resetTimeoutTrigger();
    }

    const triggerArrayToggle = () => {
        setShouldToggleEntries(true);
    };

    return [ toggledEntries, triggerArrayToggle ];
}

export function useDynamicFontSizeShrinking() {
    const constrainingElemRef = useRef(null);
    const toResizeElemRef = useRef(null);
    const originalFontSizePx = getComputedStyle(document.body).fontSize;
    const [ fontSizeStr, setFontSizeStr ] = useState(originalFontSizePx);
    const refsAreMounted = Boolean(constrainingElemRef.current && toResizeElemRef.current);
    let constrainingStyles;
    let toResizeStyles;
    let constrainingHeight;
    let constrainingWidth;
    let toResizeHeight;
    let toResizeWidth;
    let toResizeFontSize;

    if (refsAreMounted) {
        constrainingStyles = getComputedStyle(constrainingElemRef.current);
        toResizeStyles = getComputedStyle(toResizeElemRef.current);
        constrainingHeight = asNumber(constrainingStyles.height);
        constrainingWidth = asNumber(constrainingStyles.width);
        toResizeHeight = asNumber(toResizeStyles.height);
        toResizeWidth = asNumber(toResizeStyles.width);
        toResizeFontSize = asNumber(toResizeStyles.fontSize);
    }

    const shouldShrink = refsAreMounted && (
        (toResizeHeight > constrainingHeight)
        || (toResizeWidth > constrainingWidth)
    );

    if (shouldShrink) {
        const newFontSize = `${toResizeFontSize - 1}px`;

        // Prevent too many re-renders occurring at once via Promise.resolve()
        Promise.resolve().then(() => setFontSizeStr(newFontSize));
    }

    return [ constrainingElemRef, toResizeElemRef, fontSizeStr ];
}

/**
 * Causes a function to run after an animation/transition ends.
 * Useful for running logic after said animation, e.g. setting
 * `display: none;` after the element has faded out so that the
 * animation plays but then the element doesn't take up space after
 * it fades out.
 *
 * @param {function} afterAnimationFn - Function to run after the animation/transition ends
 * @returns {React.ref} - Ref to attach to the element whose animation/transition end will require listening to
 */
export function useAfterAnimation(afterAnimationFn = () => {}) {
    const animationRef = useRef(null);

    function handleAfterAnimation(...args) {
        afterAnimationFn(...args);
    }

    useEffect(() => {
        if (animationRef.current) {
            animationRef.current.addEventListener('transitionend', handleAfterAnimation);
            animationRef.current.addEventListener('animationend', handleAfterAnimation);
            animationRef.current.addEventListener('webkitAnimationEnd', handleAfterAnimation);
        }

        return () => {
            animationRef.current.removeEventListener('transitionend', handleAfterAnimation);
            animationRef.current.removeEventListener('animationend', handleAfterAnimation);
            animationRef.current.removeEventListener('webkitAnimationEnd', handleAfterAnimation);
        };
    }, [ animationRef.current, handleAfterAnimation ]);

    return animationRef;
}

/**
 * Creates a new {@code BroadcastChannel} with the given name and attaches the
 * passed event listener to the channel's 'message' event.
 *
 * @param {(messageEvent: Parameters<NonNullable<BroadcastChannel['onmessage']>>[0]) => void} messageEventListener - 'message' event listener added to BroadcastChannel.
 * @param {string} [channelName=process.env.BROADCAST_CHANNEL] - Name of BroadcastChannel.
 * @returns {BroadcastChannel} - A new BroadcastChannel with the respective event listener and channel name.
 */
export function useServiceWorkerBroadcastChannel(messageEventListener, {
    channelName = process.env.BROADCAST_CHANNEL,
} = {}) {
    const eventName = 'message';
    let broadcastChannel;

    try {
        broadcastChannel = new BroadcastChannel(channelName);
    } catch (e) {
        // BroadcastChannel not defined, likely because client is using Safari or IE
    }

    useEffect(() => {
        if (broadcastChannel == null) {
            return;
        }

        if (messageEventListener != null) {
            broadcastChannel.addEventListener(eventName, messageEventListener);
        }

        return () => {
            broadcastChannel.removeEventListener(eventName, messageEventListener);
        };
    }, [ channelName, broadcastChannel, messageEventListener ]);

    return broadcastChannel;
}
