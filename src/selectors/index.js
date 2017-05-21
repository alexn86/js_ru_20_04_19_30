import {createSelector} from 'reselect'

const articlesGetter = state => state.articles
const filtersGetter = state => state.filters
const commentsGetter = state => state.comments
const idGetter = (state, props) => props.id
const articleIdGetter = (state, props) => props.articleId

export const filteredArticlesSelector = createSelector(articlesGetter, filtersGetter, (articles, filters) => {
    console.log('---', 'recalculate articles')
    const {selected, dateRange: {from, to}} = filters

    return Object.keys(articles).reduce((acc, id) => {
        const published = Date.parse(articles[id].date);

        return ((!selected.length || selected.includes(id)) &&
        (!from || !to || (published > from && published < to))) ? {...acc, [id]: articles[id]} : {...acc};
    }, {});
})

export const commentSelectorFactory = () => createSelector(commentsGetter, idGetter, (comments, id) => {
    console.log('---', 'recalc comment', id)
    return comments[id]
});

export const articleSelectorFactory = () => createSelector(articlesGetter, idGetter, (articles, id) => {
    console.log('---', 'recalc article', id);

    return articles[id];
});

export const filteredCommentsSelector = createSelector(articlesGetter, articleIdGetter, (articles, articleId) => {
    console.log('---', 'recalc comments for', articleId, ' = ', articles[articleId].comments);
    return articles[articleId].comments;
});