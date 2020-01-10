import React, { useState, useReducer, useEffect, useRef } from 'react';
import { asNumber, elementIsInClickPath, getClickPath } from 'utils/Functions';

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
 * @param {hookedChildRenderer} props.children - Function that uses value from hook() to render children; passed as React.Component.props
 * @returns {React.Component} - Children rendered using the hook() return values
 */
export function Hooked({ hook, hookArgs, children }) {
    return children(hook(hookArgs))
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
        useEffectInputs = []
    } = {}
) {
    const [ eventState, setEventState ] = useState(initialEventState);
    const isUsingOwnEventHandler = typeof handleEvent === typeof (() => {});

    function eventListener(event) {
        const newEventState = nestedEventField ? event[nestedEventField] : event;

        if (isUsingOwnEventHandler) {
            handleEvent(eventState, setEventState, newEventState);
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

export function useWindowResize() {
    const initialState = {
        wasResized: false,
        width: window.innerWidth,
        height: window.innerHeight
    };

    function handleResize(prevState, setState) {
        setState({
            wasResized: true,
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    const [ windowSizeState, setWindowSizeState ] = useWindowEvent('resize', {
        initialEventState: initialState,
        handleEvent: handleResize
    });

    function resetWasSized() {
        setWindowSizeState(prevState => ({
            ...prevState,
            wasResized: false
        }))
    }

    return { windowSizeState, setWindowSizeState, resetWasSized };
}

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

    function handleMouseMove(prevIsHovered, setIsHovered, newEvent) {
        const { pageX, pageY } = newEvent;

        if (ref.current) {
            const { pageXOffset, pageYOffset } = window;
            let { top, bottom, left, right } = overrideBoundingClientRect || ref.current.getBoundingClientRect();

            // If using a specific bounding client rect, it will be generated from
            // an SVG, which will take the `page(X|Y)Offset` into account automatically
            if (!overrideBoundingClientRect) {
                top = top + pageYOffset;
                bottom = bottom + pageYOffset;
                left = left + pageXOffset;
                right = right + pageXOffset;
            }

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
        useEffectInputs: [ref.current]
    });

    return [ ref, isHovered ];
}

export function useTimedArrayToggle(numChildren, intervalTimeMs) {
    const toggleArrayEntryReducer = (prevShownChildren, index) => {
        const shownChildren = [...prevShownChildren];
        shownChildren[index] = true;
        return shownChildren;
    };

    const origState = Array.from({ length: numChildren }).fill(false);

    const [ toggledEntries, dispatchToggleEntry ] = useReducer(toggleArrayEntryReducer, origState);
    const [ shouldToggleEntries, setShouldToggleEntries ] = useState(false);
    const [ timeoutTriggered, setTimeoutTriggered ] = useState(false);

    if (shouldToggleEntries && !timeoutTriggered) {
        setTimeoutTriggered(true);
        for (let i = 0; i < numChildren; i++) {
            const timeToShow = intervalTimeMs*i;

            setTimeout(() => {
                dispatchToggleEntry(i);
            }, timeToShow);
        }
    }

    const triggerArrayToggle = () => {
        setShouldToggleEntries(true);
    };

    return [ toggledEntries, triggerArrayToggle ];
}

export function useDynamicFontSizeShrinking(originalConstrainingRef = { current: document.body }) {
    const constrainingElem = useRef(null);
    const toResizeElem = useRef(null);
    const originalFontSizePx = getComputedStyle(originalConstrainingRef.current).fontSize;
    const [ fontSizePx, setFontSizePx ] = useState(originalFontSizePx);
    const { windowSizeState, resetWasSized } = useWindowResize();

    useEffect(() => {
        if (constrainingElem.current && toResizeElem.current) {
            const constrainingStyles = getComputedStyle(constrainingElem.current);
            const toResizeStyles = getComputedStyle(toResizeElem.current);
            const constrainingHeight = asNumber(constrainingStyles.height);
            const constrainingWidth = asNumber(constrainingStyles.width);
            const toResizeHeight = asNumber(toResizeStyles.height);
            const toResizeWidth = asNumber(toResizeStyles.width);
            const shouldShrink = (toResizeHeight > constrainingHeight) || (toResizeWidth > constrainingWidth);

            if (shouldShrink) {
                const currentFontSize = asNumber(toResizeStyles.fontSize);
                const newFontSize = `${currentFontSize - 1}px`;

                setFontSizePx(newFontSize);
            }

            resetWasSized();
        }
    }, [ constrainingElem.current, toResizeElem.current, windowSizeState.wasResized, fontSizePx ]);

    return [ constrainingElem, toResizeElem, fontSizePx ];
}
