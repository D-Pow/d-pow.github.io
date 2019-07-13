import React from 'react';
import PropTypes from 'prop-types';
import { SHOW_ELEMENT_SCROLL_THRESHOLD } from 'utils/Constants';

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
    className: PropTypes.string,
    addClasses: PropTypes.string.isRequired,
    distributeClasses: PropTypes.string,
    threshold: PropTypes.number
};

ScrollToShow.defaultProps = {
    className: '',
    distributeClasses: '',
    threshold: SHOW_ELEMENT_SCROLL_THRESHOLD
};

export default ScrollToShow;
