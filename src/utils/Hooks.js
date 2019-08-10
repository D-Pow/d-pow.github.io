import React, { useState, useEffect, useRef } from 'react';

export function useHover() {
    const [ isHovered, setIsHovered ] = useState(false);
    const ref = useRef(null);

    function handleMouseOver() {
        setIsHovered(true);
    }
    function handleMouseOut() {
        setIsHovered(false);
    }

    useEffect(() => {
        const node = ref.current;

        if (node) {
            node.addEventListener('mouseover', handleMouseOver);
            node.addEventListener('mouseout', handleMouseOut);
        }

        return () => {
            node.removeEventListener('mouseover', handleMouseOver);
            node.removeEventListener('mouseout', handleMouseOut);
        }
    }, [ref.current]);

    return [ ref, isHovered ];
}
