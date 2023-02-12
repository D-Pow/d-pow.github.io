import React from 'react';
import PropTypes from 'prop-types';

import { SHOW_ELEMENT_SCROLL_THRESHOLD } from '@/utils/Constants';
import { asNumber } from '@/utils/Numbers';
import { childIsReactComponent } from '@/utils/ReactParsing';
import { getDurationTimeMsFromClassName } from '@/utils/Scss';

class ScrollToShow extends React.Component {
    constructor(props) {
        super(props);
        // refs used to get the top position of an HTML element
        // shownChildren used to keep track of who should be shown
        const childRefs = [];
        const shownChildren = [];
        for (let i = 0; i < React.Children.count(this.props.children); i++) {
            childRefs.push(React.createRef());
            shownChildren.push(false);
        }
        this.state = {
            childRefs,
            shownChildren
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        this.removeScrollEventListener();
    }

    removeScrollEventListener = () => {
        window.removeEventListener('scroll', this.handleScroll);
    };

    handleScroll = () => {
        const { distributeSimultaneously } = this.props;

        if (distributeSimultaneously != null) {
            if (this.shouldToggleChildShown(0)) {
                this.toggleChildIsShown(0);

                for (let i = 1; i < this.state.childRefs.length; i++) {
                    const timeToShow = distributeSimultaneously*1000*i;

                    setTimeout(() => {
                        this.toggleChildIsShown(i);
                    }, timeToShow);
                }
            }
        } else {
            for (let i = 0; i < this.state.childRefs.length; i++) {
                if (this.shouldToggleChildShown(i)) {
                    this.toggleChildIsShown(i);
                }
            }
        }
    };

    toggleChildIsShown = index => {
        const newShownChildren = [...this.state.shownChildren];
        newShownChildren[index] = true;
        this.setState({
            shownChildren: newShownChildren
        });
        this.cleanupEventListener();
    };

    /**
     * If all children have been shown, remove the event listener since it's no
     * longer needed.
     */
    cleanupEventListener() {
        const allChildrenShown = this.state.shownChildren.every(isShown => isShown);

        if (allChildrenShown) {
            this.removeScrollEventListener();

            const hasAllChildrenShownHandler = typeof this.props.onAllChildrenShown === typeof this.constructor;

            if (hasAllChildrenShownHandler) {
                const timeToDelayCallingCallback = getDurationTimeMsFromClassName(this.props.distributeClasses);

                if (timeToDelayCallingCallback) {
                    // Parent passed in an animation-duration class, so
                    // call the callback function once the last child finishes its animation.
                    setTimeout(() => {
                        this.props.onAllChildrenShown();
                    }, timeToDelayCallingCallback);
                } else {
                    this.props.onAllChildrenShown();
                }
            }
        }
    }

    shouldToggleChildShown(index) {
        const shouldShowChild = this.shouldChildBeShown(index);
        const isShown = this.state.shownChildren[index];

        return shouldShowChild && !isShown;
    }

    shouldChildBeShown(index) {
        // TODO maybe use linear interpolation methods described [here](https://www.trysmudford.com/blog/linear-interpolation-functions/)
        if (index >= this.state.childRefs.length) {
            return false;
        }
        const thresholdScrollPosition = window.innerHeight * this.props.threshold;
        const elemTop = this.getTotalOffsetTop(this.state.childRefs[index].current);
        return elemTop <= thresholdScrollPosition;
    }

    getTotalOffsetTop(element) {
        return element.getBoundingClientRect().top - asNumber(getComputedStyle(element).marginTop);
    }

    getClassNames = index => {
        const { addClasses, distributeClasses } = this.props;
        let classes = [];

        if (distributeClasses) {
            classes.push(distributeClasses);
        }

        if (this.state.shownChildren[index]) {
            classes.push(addClasses);
        }

        return classes.join(' ');
    };

    /**
     * Forces child to be a render-able HTML element that can hold a ref.
     * If the child is an HTML element, it will be cloned; if it's a React
     * component, it will be wrapped in a div.
     * The returned element will contain the appropriate classes from props.addClasses
     * and props.distributeClasses, as well as an attached ref.
     *
     * @param {Node} child - Child either of type HTML element or React component
     * @param {number} index - Index of child in this.props.children
     * @returns {Node} HTML element with attached ref
     */
    asHtmlElement = (child, index) => {
        if (childIsReactComponent(child)) {
            return (
                <div className={this.getClassNames(index)} key={index} ref={this.state.childRefs[index]}>
                    {child}
                </div>
            );
        }

        return React.cloneElement(child, {
            className: `${child.props && child.props.className ? child.props.className : ''} ${this.getClassNames(index)}`,
            key: index,
            ref: this.state.childRefs[index]
        });
    };

    render() {
        const renderedContent = React.Children.map(this.props.children, this.asHtmlElement);

        if (this.props.className) {
            return (
                <div className={this.props.className}>
                    {renderedContent}
                </div>
            );
        }

        return (
            <React.Fragment>
                {renderedContent}
            </React.Fragment>
        );
    }
}

ScrollToShow.propTypes = {
    // Parent div's class, not affected by the scroll amount
    className: PropTypes.string,

    // Classes to distribute to all children after they should be shown
    addClasses: PropTypes.string.isRequired,

    // Classes to distribute to all children before they should be shown
    distributeClasses: PropTypes.string,

    // Distribute the classes as soon as the first element is found, each separated by `distributeSimultaneously` seconds
    distributeSimultaneously: PropTypes.number,

    // Percentage of the way down the screen the user needs to scroll in order to activate appending addClasses
    threshold: PropTypes.number,

    // Function to call after all children have been shown
    onAllChildrenShown: PropTypes.func
};

ScrollToShow.defaultProps = {
    className: '',
    distributeClasses: '',
    threshold: SHOW_ELEMENT_SCROLL_THRESHOLD
};

export default ScrollToShow;
