import React, { useState, useEffect, useRef } from 'react';

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

export function useWindowEvent(eventType, eventField, initialValue = null) {
    const [ value, setValue ] = useState(initialValue);

    function handleEvent(event) {
        setValue(event[eventField]);
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

export function Hooked({ hook, children }) {
    return children(hook())
}
