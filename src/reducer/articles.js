import { articles as defaultArticles } from '../fixtures'
import { DELETE_ARTICLE, FILTER_CHANGED} from '../constants'

export default (articles = defaultArticles, action) => {
    const {type, payload} = action;

    switch (type) {
        case DELETE_ARTICLE:
            return articles.filter(article => article.id !== payload.id);
        case FILTER_CHANGED:
            const selection = payload.selection || payload.filters.selection;
            const date = payload.date ||  payload.filters.date;

            if (selection.length || date.from || date.to) {
                return payload.articles.filter(article => {
                    return (selection.some(select => select.value === article.id) || !selection.length)
                        && (date.from <= new Date(article.date) || !date.from)
                        && (date.to >= new Date(article.date) || !date.to)
                });
            } else {
                return payload.articles;
            }
    }

    return articles
}
