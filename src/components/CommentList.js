import React, {Component} from 'react'
import Comment from './Comment'
import CommentForm from './CommentForm/index'
import toggleOpen from '../decorators/toggleOpen'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loadAllComments} from '../AC/index'
import Loader from './Loader'
import {checkLoadingComments} from '../selectors'

class CommentList extends Component {

    state = {
        loading: false
    }

    componentWillReceiveProps(props) {
        const {article, isOpen, isLoaded, loadAllComments} = props;
        if (isOpen && !this.props.isOpen && !isLoaded) {
            this.setState({
                loading: true
            });
            loadAllComments(article.id)
        }
        if (isLoaded) {
            this.setState({
                loading: false
            });
        }
    }

    getBody() {
        const {article: { id, comments = [] }, isOpen} = this.props
        if (this.state.loading) return <Loader />
        if (!isOpen) return null
        if (!comments.length) return <div><p>No comments yet</p><CommentForm articleId = {id}/></div>
        return (
            <div>
                <ul>
                    {comments.map(id => <li key={id}><Comment id={id}/></li>)}
                </ul>
                <CommentForm articleId = {id} />
            </div>
    )
}

    render() {
        const {isOpen, toggleOpen} = this.props
        const linkText = isOpen ? 'hide comments' : 'show comments'

        return (
            <div>
                <a href="#" onClick={toggleOpen}>{linkText}</a>
                {this.getBody()}
            </div>
        )
    }
}

CommentList.propTypes = {
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func,
    article: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoaded: checkLoadingComments(state, ownProps)
    }
}

export default connect(mapStateToProps, { loadAllComments })(toggleOpen(CommentList))