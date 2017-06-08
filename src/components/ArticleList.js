import React, {Component} from 'react'
import Article from './Article/index'
import Loader from './Loader'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {filteredArticlesSelector} from '../selectors'
import {loadAllArticles} from '../AC'
import {NavLink} from 'react-router-dom'

class ArticleList extends Component {
    componentDidMount() {
        const {isLoaded, isLoading, loadAllArticles} = this.props
        if (!isLoading && !isLoaded) loadAllArticles()
    }


    render() {
        const {articles, isLoading, match} = this.props
        if (isLoading) return <Loader />

        const elements = articles.map(article => <li key={article.id}>
            <NavLink to = {`${match.url}/${article.id}`} activeStyle={{color: 'red'}}>{article.title}</NavLink>
        </li>)
        return (
            <ul>
                {elements}
            </ul>
        )
    }
}

ArticleList.propTypes = {
    articles: PropTypes.array,
    //from react-router
    match: PropTypes.object.isRequired,
}

export default connect((state) => ({
    articles: filteredArticlesSelector(state),
    isLoaded: state.articles.loaded,
    isLoading: state.articles.loading
}), {loadAllArticles})(ArticleList)