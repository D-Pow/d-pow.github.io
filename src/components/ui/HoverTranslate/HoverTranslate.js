import React from 'react';
import PropTypes from 'prop-types';
import { useHover } from 'utils/Hooks';

function HoverTranslate({ className, animationCls, english, japanese, passedRef, boundingClientRectForHover, aria }) {
    // Since the absolute-positioned divs cover one another, the :hover only gets applied to the element rendered
    // on top (the latter of the div.absolute-center). Thus, a set of .hover-(show|hide) CSS classes won't work
    // unless the CSS uses sibling selectors for show/hide. Until that is added, simply use the useHover() hook
    // to determine if the elements are hovered or not
    // TODO convert to CSS instead of JS scroll handler
    const [ ref, isHovered ] = useHover(boundingClientRectForHover);

    const renderText = ({ title, description }, show, ref) => (
        <div className={`${animationCls} ${show ? 'show' : ''}`} ref={ref}>
            <h1 className={'font-size-2-5em'}>{title}</h1>
            <h4 className={'font-size-1-5em'}>{description}</h4>
        </div>
    );

    // Japanese font is larger than English, so attach ref to Japanese render
    // so that the hover boundary is larger
    return (
        <div className={className} {...aria}>
            <div className={'absolute-center'}>
                {renderText(english, isHovered, passedRef)}
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
    boundingClientRectForHover: PropTypes.object,
    aria: PropTypes.object
};

HoverTranslate.defaultProps = {
    className: '',
    animationCls: 'animated fade duration-5',
    english: { title: '', description: '' },
    japanese: { title: '', description: '' },
    aria: {}
};

export default HoverTranslate;
