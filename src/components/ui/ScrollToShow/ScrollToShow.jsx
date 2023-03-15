import {
    PureComponent,
    Children,
    createRef,
    cloneElement,
} from 'react';
import PropTypes from 'prop-types';

import { SHOW_ELEMENT_SCROLL_THRESHOLD } from '@/utils/Constants';
import { asNumber } from '@/utils/Numbers';
import { childIsReactComponent } from '@/utils/ReactParsing';
import { getDurationTimeMsFromClassName } from '@/utils/Scss';


class ScrollToShow extends PureComponent {
    static propTypes = {
        // Parent div's class, not affected by the scroll amount
        className: PropTypes.string,

        // Classes to distribute to all children after they should be shown
        addClasses: PropTypes.string.isRequired,

        // Classes to distribute to all children before they should be shown
        distributeClassesBeforeShow: PropTypes.string,

        // Distribute the classes as soon as the first element is found, each separated by `distributeSimultaneouslyInterval` seconds
        distributeSimultaneouslyInterval: PropTypes.number,

        /**
         * The className prefix used to denote the animation duration time, or the duration milliseconds itself.
         *
         * @see [`getDurationTimeMsFromClassName()`]{@link getDurationTimeMsFromClassName}
         */
        animationDurationOrClassPrefix: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),

        // Percentage of the way down the screen the user needs to scroll in order to activate appending addClasses
        threshold: PropTypes.number,

        // Function to call after all children have been shown
        onAllChildrenShown: PropTypes.func,
    };

    static defaultProps = {
        className: '',
        children: [],
        distributeClassesBeforeShow: '',
        threshold: SHOW_ELEMENT_SCROLL_THRESHOLD,
    };

    state = {
        // Used to get the top position of the respective HTML elements
        childRefs: Children.toArray(this.props.children).map(() => createRef()),
        // Used to keep track of which children are shown
        shownChildren: Children.toArray(this.props.children).map(() => false),
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, {
            passive: true, // Disallows `event.preventDefault()` but improves performance due to the event not being cancellable, so renders aren't blocked. Only needed for IE and the new IE (Safari). See: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners
        });

        // Run scroll event-handler in case children are within the scroll threshold and should be modified.
        // Append the event-handler to the end of the event queue to ensure all React's internal events
        // (including rendering) have finished before attempting to read `element.getBoundingClientRect()`.
        Promise.resolve().then(() => {
            this.handleScroll();
        });
    }

    componentWillUnmount() {
        this.removeScrollEventListener();
    }

    removeScrollEventListener = () => {
        window.removeEventListener('scroll', this.handleScroll);
    };

    /**
     * If all children have been shown, remove the event listener since it's no
     * longer needed.
     */
    cleanupEventListener() {
        const allChildrenShown = this.state.shownChildren.every(isShown => isShown);

        if (allChildrenShown) {
            this.removeScrollEventListener();

            const timeToDelayCallingCallback = typeof this.props.animationDurationOrClassPrefix === typeof 0
                ? this.props.animationDurationOrClassPrefix
                : getDurationTimeMsFromClassName(this.props.distributeClassesBeforeShow || '', {
                    classNamePrefix: this.props.animationDurationOrClassPrefix,
                });

            if (timeToDelayCallingCallback) {
                // Parent passed in an animation-duration class, so fire the callback
                // after the last child finishes its animation.
                setTimeout(() => {
                    this.props.onAllChildrenShown?.();
                }, timeToDelayCallingCallback);
            } else {
                this.props.onAllChildrenShown?.();
            }
        }
    }

    handleScroll = (event) => {
        const { distributeSimultaneouslyInterval } = this.props;

        if (distributeSimultaneouslyInterval != null) {
            if (this.shouldToggleChildShown(0)) {
                this.toggleChildIsShown(0);

                for (let i = 1; i < this.state.childRefs.length; i++) {
                    const timeToShow = distributeSimultaneouslyInterval * 1000 * i;

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

        this.cleanupEventListener();
    };

    shouldToggleChildShown(index) {
        const shouldShowChild = this.shouldChildBeShown(index);
        const isShown = this.state.shownChildren[index];

        return shouldShowChild && !isShown;
    }

    shouldChildBeShown(index) {
        if (index >= this.state.childRefs.length) {
            return false;
        }

        const thresholdScrollPosition = window.innerHeight * this.props.threshold;
        const elemTop = this.getTotalOffsetTop(this.state.childRefs[index].current);

        return elemTop <= thresholdScrollPosition;
    }

    toggleChildIsShown = (index) => {
        const newShownChildren = [ ...this.state.shownChildren ];

        newShownChildren[index] = true;

        if (this.state.shownChildren[index] !== newShownChildren[index]) {
            this.setState({
                shownChildren: newShownChildren,
            });
        }
    };

    getTotalOffsetTop(element) {
        return element.getBoundingClientRect().top - asNumber(getComputedStyle(element).marginTop);
    }

    getClassNames = (index) => {
        const { addClasses, distributeClassesBeforeShow } = this.props;
        const classes = [];

        if (distributeClassesBeforeShow) {
            classes.push(distributeClassesBeforeShow);
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
     * and props.distributeClassesBeforeShow, as well as an attached ref.
     *
     * @param child - Child either of type HTML element or React component
     * @param index - Index of child in this.props.children
     * @returns HTML element with attached ref
     */
    asHtmlElement = (child, index) => {
        if (childIsReactComponent(child)) {
            return (
                <div
                    className={this.getClassNames(index)}
                    ref={this.state.childRefs[index]}
                    key={index}
                >
                    {child}
                </div>
            );
        }

        return cloneElement(child, {
            ...child.props,
            className: `${child.props?.className ?? ''} ${this.getClassNames(index)}`,
            key: index,
            ref: this.state.childRefs[index],
        });
    };

    render() {
        const renderedContent = Children.map(this.props.children, this.asHtmlElement);

        if (this.props.className) {
            return (
                <div className={this.props.className}>
                    {renderedContent}
                </div>
            );
        }

        return (
            <>
                {renderedContent}
            </>
        );
    }
}

export default ScrollToShow;
