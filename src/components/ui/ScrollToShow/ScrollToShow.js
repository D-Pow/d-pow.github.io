import React from 'react';
import PropTypes from 'prop-types';
import { SHOW_ELEMENT_SCROLL_THRESHOLD } from "utils/Constants";

class ScrollToShow extends React.Component {
    constructor(props) {
        super(props);
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

    getTotalOffsetTop(element) {
        return element.getBoundingClientRect().top;
    }

    shouldBeShown(index) {
        if (index >= this.state.childRefs.length) {
            return false;
        }
        const thresholdScrollPosition = window.innerHeight * this.props.threshold;
        const elemTop = this.getTotalOffsetTop(this.state.childRefs[index].current);
        return elemTop - window.pageYOffset <= thresholdScrollPosition;
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

    getClassNames(index) {
        const { addClasses } = this.props;
        let classes = [];
        if (this.state.shownChildren[index]) {
            classes = Array.isArray(addClasses) ? addClasses : [addClasses];
        }
        return classes.join(' ');
    }

    handleScroll() {
        for (let i = 0; i < this.state.childRefs.length; i++) {
            this.updateChildState(i);
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <React.Fragment>
                {React.Children.map(this.props.children, (child, index) => (
                    React.cloneElement(child, {
                        className: `${child.props.className ? child.props.className : ''} ${this.getClassNames(index)}`,
                        key: index,
                        ref: this.state.childRefs[index]
                    })
                ))}
            </React.Fragment>
        );
    }
}

ScrollToShow.propTypes = {
    addClasses: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]).isRequired,
    threshold: PropTypes.number
};

ScrollToShow.defaultProps = {
    threshold: SHOW_ELEMENT_SCROLL_THRESHOLD
};

export default ScrollToShow;
