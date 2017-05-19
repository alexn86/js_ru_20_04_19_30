import {createSelector} from 'reselect'

export const articlesGetter = state => state.articles
export const filtersGetter = state => state.filters
export const commentsGetter = state => state.comments
export const idGetter = (state, props) => props.id

export const filteredArticlesSelector = createSelector(articlesGetter, filtersGetter, (articles, filters) => {
    console.log('---', 'recalculate articles')
    const {selected, dateRange: {from, to}} = filters

    return articles.filter(article => {
        const published = Date.parse(article.date)
        return (!selected.length || selected.includes(article.id)) &&
            (!from || !to || (published > from && published < to))
    })
})

export const commentSelectorFactory = () => createSelector(commentsGetter, idGetter, (comments, id) => {
    console.log('---', 'recalc comment', id)
    return comments[id]
})