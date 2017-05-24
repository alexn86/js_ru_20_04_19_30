import {createSelector} from 'reselect'
import {mapToArr} from '../utils'

export const articlesGetter = state => state.articles.entities
export const filtersGetter = state => state.filters
export const commentsGetter = state => state.comments
export const idGetter = (state, props) => props.id
export const commentsIdGetter = (state, props) => props.article.comments

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

export const checkLoadingComments = createSelector(commentsGetter, commentsIdGetter, (comments, ids) => {
    return !!mapToArr(comments).filter(comment => ids.indexOf(comment.id) >= 0).length
})