import React, { useState, useReducer, useEffect, useRef } from 'react';
import { elementIsInClickPath, getClickPath } from 'utils/Functions';

export function UseContext({ Context, defaultValue = null, children }) {
    const [ value, setValue ] = useState(defaultValue);

    return (
        <Context.Provider value={{ value, setValue }}>
            {children}
        </Context.Provider>
    );
}

export function useHover() {
    const [ isHovered, setIsHovered ] = useState(false);
    const ref = useRef(null);

    function handleMouseMove({ pageX, pageY }) {
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

    useEffect(() => {
        if (ref.current) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [ref.current]);

    return [ ref, isHovered ];
}

export function useWindowEvent(eventType, eventField = null, initialValue = null) {
    const [ value, setValue ] = useState(initialValue);

    function handleEvent(event) {
        setValue(eventField ? event[eventField] : event);
    }

    useEffect(() => {
        window.addEventListener(eventType, handleEvent);

        return () => {
            window.removeEventListener(eventType, handleEvent);
        };
    }, []);

    return [ value, setValue ];
}

export function useKeyboardEvent(type = 'down') {
    return useWindowEvent(`key${type}`, 'key');
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

export function Hooked({ hook, children }) {
    return children(hook())
}
