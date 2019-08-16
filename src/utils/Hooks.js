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

export function Hooked({ hook, children }) {
    return children(hook())
}
