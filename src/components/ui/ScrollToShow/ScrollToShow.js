import React from 'react';
import PropTypes from 'prop-types';
import { SHOW_ELEMENT_SCROLL_THRESHOLD } from 'utils/Constants';

class ScrollToShow extends React.Component {
    constructor(props) {
        super(props);
        // refs used to get the top position of an HTML element
        // shownChildren used to keep track of who should be shown
        const childRefs = [];
        const shownChildren = [];
        for (let i = 0; i < this.props.children.length; i++) {
            childRefs.push(React.createRef());
            shownChildren.push(false);
        }
        this.state = {
            childRefs,
            shownChildren
        };
        this.updateChildState = this.updateChildState.bind(this);
        this.getClassNames = this.getClassNames.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        for (let i = 0; i < this.state.childRefs.length; i++) {
            this.updateChildState(i);
        }
    }

    updateChildState(index) {
        const shouldShowChild = this.shouldBeShown(index);
        const isShown = this.state.shownChildren[index];
        if (shouldShowChild && !isShown) {
            const newShownChildren = [...this.state.shownChildren];
            newShownChildren[index] = true;
            this.setState({
                shownChildren: newShownChildren
            });
        }
    }

    shouldBeShown(index) {
        if (index >= this.state.childRefs.length) {
            return false;
        }
        const thresholdScrollPosition = window.innerHeight * this.props.threshold;
        const elemTop = this.getTotalOffsetTop(this.state.childRefs[index].current);
        return elemTop <= thresholdScrollPosition;
    }

    getTotalOffsetTop(element) {
        return element.getBoundingClientRect().top;
    }

    getClassNames(index) {
        const { addClasses, distributeClasses } = this.props;
        let classes = [];

        if (distributeClasses) {
            classes.push(distributeClasses);
        }

        if (this.state.shownChildren[index]) {
            classes.push(addClasses);
        }

        return classes.join(' ');
    }

    render() {
        return (
            <div className={this.props.className}>
                {React.Children.map(this.props.children, (child, index) => (
                    React.cloneElement(child, {
                        className: `${child.props.className ? child.props.className : ''} ${this.getClassNames(index)}`,
                        key: index,
                        ref: this.state.childRefs[index]
                    })
                ))}
            </div>
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

    // Percentage of the way down the screen the user needs to scroll in order to activate appending addClasses
    threshold: PropTypes.number
};

ScrollToShow.defaultProps = {
    className: '',
    distributeClasses: '',
    threshold: SHOW_ELEMENT_SCROLL_THRESHOLD
};

export default ScrollToShow;
