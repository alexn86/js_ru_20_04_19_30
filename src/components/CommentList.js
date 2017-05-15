import React, {Component} from 'react'
import Comment from './Comment'
import CommentForm from './CommentForm/index'
import toggleOpen from '../decorators/toggleOpen'
import PropTypes from 'prop-types'

function CommentList(props) {
    const {isOpen, toggleOpen} = props
    const linkText = isOpen ? 'hide comments' : 'show comments'

    return (
        <div>
            <a href="#" onClick={toggleOpen}>{linkText}</a>
            {getBody(props)}
        </div>
    )
}

function getBody(props) {
    const {comments = [], isOpen} = props
    if (!isOpen) return null
    if (!comments.length) return <div><p>No comments yet</p><CommentForm/></div>
    return (
        <div>
            <ul>
                {comments.map(comment => <li key={comment.id}><Comment comment={comment}/></li>)}
            </ul>
            <CommentForm />
        </div>
    )
}

CommentList.propTypes = {
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func,
    comments: PropTypes.array
}

export default toggleOpen(CommentList)