import React, {Component} from 'react'
import CommnetList from '../CommentList'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import './style.css'

class Article extends Component {
    static propTypes = {
        article: PropTypes.shape({
            title: PropTypes.string.isRequired,
            text: PropTypes.string,
            comments: PropTypes.array
        }),
        //from toggleOpen decorator
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    }

/*
    componentWillMount() {
        console.log('---', 'mounting')
    }
*/
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.isOpen != this.props.isOpen
    }

    componentWillUpdate() {
        console.log('---', 'updating')
    }

    render() {
        const {article, toggleOpen} = this.props
        return (
            <section>
                <h2 onClick={toggleOpen}>
                    {article.title}
                </h2>
                <CSSTransitionGroup
                    transitionName = "article"
                    transitionEnterTimeout = {500}
                    transitionLeaveTimeout = {30000}
                >
                    {this.getBody()}
                </CSSTransitionGroup>
            </section>
        )
    }

    getBody() {
        return this.props.isOpen && (
            <div>
                {this.props.article.text}
                <CommnetList comments={this.props.article.comments}/>
            </div>
        )
    }
}

export default Article