import React from 'react'
import Article from './Article'
import PropTypes from 'prop-types'
import accordeon from './../decorators/accordeon';

function ArticleList(props) {
    const { openItemId, toggleItem } = props;
    const elements = props.articles.map(article => <li key={article.id}>
        <Article article={article}
                 isOpen={article.id == openItemId}
                 toggleOpen={toggleItem(article.id)}/>
    </li>);

    return (
        <ul>
            {elements}
        </ul>
    );
}

ArticleList.propTypes = {
    articles: PropTypes.array,
    //from accordeon decorator
    openItemId: PropTypes.string,
    toggleItem: PropTypes.func
};

export default accordeon(ArticleList);