import {createSelector} from 'reselect'
import {mapToArr} from '../utils'

export const articlesGetter = state => state.articles.entities
export const filtersGetter = state => state.filters
export const commentsGetter = state => state.comments
export const idGetter = (state, props) => props.id

export const filteredArticlesSelector = createSelector(articlesGetter, filtersGetter, (articles, filters) => {
    const {selected, dateRange: {from, to}} = filters

    return mapToArr(articles).filter(article => {
        const published = Date.parse(article.date)
        return (!selected.length || selected.includes(article.id)) &&
            (!from || !to || (published > from && published < to))
    })
})

export const commentSelectorFactory = () => createSelector(commentsGetter, idGetter, (comments, id) => {
    return comments.get(id)
})