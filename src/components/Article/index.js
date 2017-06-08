import React, {Component} from 'react'
import CommnetList from '../CommentList'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import Loader from '../Loader'
import './style.css'
import {connect} from 'react-redux'
import {deleteArticle, loadArticle} from '../../AC/index'
import LocalizedText from '../LocalizedText'

class Article extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        article: PropTypes.shape({
            title: PropTypes.string,
            text: PropTypes.string,
            comments: PropTypes.array
        }),
        //from toggleOpen decorator
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    }

    static contextTypes = {
        user: PropTypes.string
    }

    componentDidMount() {
        this.checkAndLoad(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.checkAndLoad(nextProps)
    }

    checkAndLoad({article, id, loadArticle}) {
        if (!article || (!article.text && !article.loading)) loadArticle(id)
    }

    render() {
        const {article, toggleOpen} = this.props
        if (!article) return null
        return (
            <section>
                <h2 onClick={toggleOpen}>
                    {article.title}
                </h2>
                <h3>
                    User: {this.context.user}
                </h3>
                <a href = "#" onClick = {this.handleDelete}><LocalizedText>delete me</LocalizedText></a>
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
}), { deleteArticle, loadArticle }, null, {pure: false})(Article)