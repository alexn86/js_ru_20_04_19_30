import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ArticleList from '../components/ArticleList'
import Article from '../components/Article'
import {Route} from 'react-router-dom'

class ArticlesPage extends Component {
    static propTypes = {

    };

    static contextTypes = {
        user: PropTypes.string
    }

    render() {
        const {match} = this.props
        console.log('---', 1)
        return (
            <div>
                <h2>UserName: {this.context.user}</h2>
                <ArticleList match = {match} />
                <Route path = {`${match.url}/:id`} render = {this.getActiveArticle}/>
            </div>
        )
    }

    getActiveArticle = ({match}) => {
        console.log('---', 2)
        return <Article id = {match.params.id} key = {match.params.id} isOpen />
    }
}

export default ArticlesPage