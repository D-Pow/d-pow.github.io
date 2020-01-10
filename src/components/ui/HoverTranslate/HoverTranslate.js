import React from 'react';
import PropTypes from 'prop-types';
import { useHover } from 'utils/Hooks';

function HoverTranslate({ className, animationCls, english, japanese, passedRef, boundingClientRectForHover }) {
    const [ ref, isHovered ] = useHover(boundingClientRectForHover);

    const renderText = ({ title, description }, show) => (
        <div className={`${animationCls} ${show ? 'show' : ''}`}>
            <h1 className={'font-size-2-5em'}>{title}</h1>
            <h4 className={'font-size-1-5em'}>{description}</h4>
        </div>
    );

    // Japanese font is larger than English, so attach ref to Japanese render
    // so that the hover boundary is larger
    return (
        <div className={className}>
            <div className={'absolute-center'} ref={passedRef}>
                {renderText(english, isHovered)}
            </div>
            <div className={'absolute-center'} ref={ref}>
                {renderText(japanese, !isHovered)}
            </div>
        </div>
    );
}

HoverTranslate.propTypes = {
    className: PropTypes.string,
    animationCls: PropTypes.string,
    english: PropTypes.shape({
        title: PropTypes.node,
        description: PropTypes.node
    }),
    japanese: PropTypes.shape({
        title: PropTypes.node,
        description: PropTypes.node
    }),
    passedRef: PropTypes.object,
    boundingClientRectForHover: PropTypes.object
};

HoverTranslate.defaultProps = {
    className: '',
    animationCls: 'animated fade duration-5',
    english: { title: '', description: '' },
    japanese: { title: '', description: '' }
};

export default HoverTranslate;
