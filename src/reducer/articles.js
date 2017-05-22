import {normalizedArticles as defaultArticles} from '../fixtures'
import {DELETE_ARTICLE, ADD_COMMENT} from '../constants'

const articleMap = defaultArticles.reduce((acc, article) => ({
    ...acc, [article.id]: article
}), {});

export default (articles = articleMap, action) => {
    const {type, payload} = action
    switch (type) {
        case DELETE_ARTICLE:
            //return articles.filter(article => article.id !== payload.id)
            return Object.keys(articles).reduce((acc, id) => {
                return id !== payload.id ? {...acc, [id]: articles[id]} : {...acc};
            }, {})
        case ADD_COMMENT:
            articles = {...articles};
            console.log(articles, payload.articleId, articles[payload.articleId]);
            //обрати внимание, comments - обычный массив, значит ты мутируеш стейт
            articles[payload.articleId].comments.push(payload.id);
            return articles
    }

    return articles
}
