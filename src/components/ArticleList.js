import React, {Component} from 'react'
import Article from './Article/index'
import Loader from './Loader'
import PropTypes from 'prop-types'
import accordion from '../decorators/accordion'
import {connect} from 'react-redux'
import {filteredArticlesSelector} from '../selectors'
import {loadAllArticles} from '../AC'

class ArticleList extends Component {
    componentDidMount() {
        const {isLoaded, isLoading, loadAllArticles} = this.props
        if (!isLoading && !isLoaded) loadAllArticles()
    }


    render() {
        const {articles, isLoading, toggleOpenItem, isItemOpened} = this.props
        if (isLoading) return <Loader />

        const elements = articles.map(article => <li key={article.id}>
            <Article article = {article}
                     isOpen = {isItemOpened(article.id)}
                     toggleOpen = {toggleOpenItem(article.id)}
                     ref = {article.id}
            />
        </li>)
        return (
            <ul ref={this.getContainerRef}>
                {elements}
            </ul>
        )
    }

    getContainerRef = ref => {
        this.list = ref
    }
}

ArticleList.propTypes = {
    articles: PropTypes.array,
    //from accordion decorator
    toggleOpenItem: PropTypes.func.isRequired,
    isItemOpened: PropTypes.func.isRequired
}

export default connect((state) => ({
    articles: filteredArticlesSelector(state),
    isLoaded: state.articles.loaded,
    isLoading: state.articles.loading
}), {loadAllArticles})(accordion(ArticleList))