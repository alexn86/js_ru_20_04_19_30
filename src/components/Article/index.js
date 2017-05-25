import React, {Component} from 'react'
import CommnetList from '../CommentList'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import Loader from '../Loader'
import './style.css'
import {connect} from 'react-redux'
import {deleteArticle, loadArticle} from '../../AC/index'

class Article extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        article: PropTypes.shape({
            title: PropTypes.string.isRequired,
            text: PropTypes.string,
            comments: PropTypes.array
        }),
        //from toggleOpen decorator
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    }

    componentWillReceiveProps({article, id, loadArticle}) {
        if (!article || (!article.text && !article.loading)) loadArticle(id)
    }

/*
    componentWillMount() {
        console.log('---', 'mounting')
    }
*/

    componentWillUpdate() {
        console.log('---', 'updating')
    }

    render() {
        const {article, toggleOpen} = this.props
        if (!article) return null
        return (
            <section>
                <h2 onClick={toggleOpen}>
                    {article.title}
                </h2>
                <a href = "#" onClick = {this.handleDelete}>delete me</a>
                <CSSTransitionGroup
                    transitionName = "article"
                    transitionEnterTimeout = {500}
                    transitionLeaveTimeout = {300}
                >
                    {this.getBody()}
                </CSSTransitionGroup>
            </section>
        )
    }

    handleDelete = ev => {
        ev.preventDefault()
        const { deleteArticle, article } = this.props
        deleteArticle(article.id)
    }

    getBody() {
        const {isOpen, article} = this.props
        if (!isOpen) return null
        if (article.loading) return <Loader />
        return (
            <div>
                {this.props.article.text}
                <CommnetList article = {this.props.article}/>
            </div>
        )
    }
}

export default connect((state, {id}) => ({
    article: state.articles.getIn(['entities', id])
}), { deleteArticle, loadArticle })(Article)