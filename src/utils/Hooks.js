import React, { useState, useReducer, useEffect, useRef } from 'react';
import { elementIsInClickPath, getClickPath } from 'utils/Functions';

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
export function Hooked({ hook, children }) {
    return children(hook())
}

export function UseContext({ Context, defaultValue = null, children }) {
    const [ contextState, setContextState ] = useState(defaultValue);

    return (
        <Context.Provider value={{ contextState, setContextState }}>
            {children}
        </Context.Provider>
    );
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

export function useHover() {
    const ref = useRef(null);

    function handleMouseMove(prevIsHovered, setIsHovered, newEvent) {
        const { pageX, pageY } = newEvent;

        if (ref.current) {
            const { pageXOffset, pageYOffset } = window;
            let { top, bottom, left, right } = ref.current.getBoundingClientRect();

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
