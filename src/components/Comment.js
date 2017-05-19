import React  from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {commentSelectorFactory} from '../selectors'

function Comment({comment}) {
    return (
        <div>
            <p>{comment.text} <b>by {comment.user}</b></p>
        </div>
    )
}

Comment.propTypes = {
    id: PropTypes.number,
    //from connect
    comment: PropTypes.shape({
        text: PropTypes.string,
        user: PropTypes.string
    })
}

function createMapStateToProps() {
    const commentSelector = commentSelectorFactory()

    return function mapStateToProps(state, ownProps) {
        return {
            comment: commentSelector(state, ownProps)
        }
    }
}

export default connect(createMapStateToProps)(Comment)