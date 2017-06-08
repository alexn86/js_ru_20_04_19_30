import React, {Component} from 'react'
import Comment from './Comment'
import CommentForm from './CommentForm/index'
import toggleOpen from '../decorators/toggleOpen'
import PropTypes from 'prop-types'
import Loader from './Loader'
import LocalizedText from './LocalizedText'
import {loadArticlesComments} from '../AC'
import {connect} from 'react-redux'

class CommentList extends Component {
    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object
    }

    componentWillReceiveProps({ article, isOpen, loadArticlesComments }) {
        if (isOpen && !article.loadedComments && !article.loadingComments) loadArticlesComments(article.id)
    }

    render() {
        console.log('---', 'context:', this.context)
        const {isOpen, toggleOpen} = this.props
        const linkText = isOpen ? 'hide comments' : 'show comments'

        return (
            <div>
                <a href="#" onClick={toggleOpen}><LocalizedText>{linkText}</LocalizedText></a>
                {this.getBody()}
            </div>
        )
    }

    getBody() {
        const {article: { loadedComments, loadingComments, id, comments = [] }, isOpen} = this.props
        if (!isOpen) return null
        if (loadingComments) return <Loader/>
        if (!loadedComments) return null

        if (!comments.length) return <div>
            <p><LocalizedText>No comments yet</LocalizedText></p>
            <CommentForm articleId = {id}/>
        </div>

        return (
            <div>
                <ul>
                    {comments.map(id => <li key={id}><Comment id={id}/></li>)}
                </ul>
                <CommentForm articleId = {id} />
            </div>
        )
    }
}

CommentList.propTypes = {
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func,
    article: PropTypes.object
}

export default connect(null, { loadArticlesComments }, null, {pure: false})(toggleOpen(CommentList))