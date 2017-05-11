import React from 'react'
import Article from './Article'
import PropTypes from 'prop-types'
import toggleArticle from './../decorators/toggleArticle';

function ArticleList(props) {
    const { openArticleId, toggleArticle } = props;
    const elements = props.articles.map(article => <li key={article.id}>
        <Article article={article}
                 isOpen={article.id == openArticleId}
                 toggleOpen={toggleArticle(article.id)}/>
    </li>);

    return (
        <ul>
            {elements}
        </ul>
    );
}

ArticleList.propTypes = {
    articles: PropTypes.array,
    //from toggleArticle decorator
    openArticleId: PropTypes.string,
    toggleArticle: PropTypes.func
};

export default toggleArticle(ArticleList);