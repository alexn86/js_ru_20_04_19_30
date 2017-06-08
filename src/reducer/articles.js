import {DELETE_ARTICLE, ADD_COMMENT, LOAD_ALL_ARTICLES, LOAD_ARTICLE, LOAD_ARTICLE_COMMENTS, START, SUCCESS} from '../constants'
import {arrayToMap} from '../utils'
import {Map, OrderedMap, Record} from 'immutable'

const ArticleModel = Record({
    id: null,
    date: null,
    title: null,
    text: '',
    comments: [],
    loading: false,
    loadedComments: false,
    loadingComments: false
})

const DefaultReducerState = Record({
    entities: new OrderedMap({}),
    loading: false,
    loaded: false
})

export default (articles = new DefaultReducerState(), action) => {
    const {type, payload, response, randomId} = action
    switch (type) {
        case DELETE_ARTICLE:
            return articles.deleteIn(['entities', payload.id])

        case ADD_COMMENT:
            return articles.updateIn(
                ['entities', payload.articleId, 'comments'],
                (comments) => comments.concat(randomId)
            )

        case LOAD_ALL_ARTICLES + START:
            return articles.set('loading', true)

        case LOAD_ALL_ARTICLES + SUCCESS:
            return articles
                .update('entities', entities => arrayToMap(response, ArticleModel).merge(entities))
                .set('loading', false)
                .set('loaded', true)

        case LOAD_ARTICLE + START:
             return articles.updateIn(
                 ['entities', payload.id],
                 new ArticleModel({id: payload.id}),
                 article => article.set('loading', true)
             )

        case LOAD_ARTICLE + SUCCESS:
            return articles.setIn(['entities', payload.id], new ArticleModel(payload.response))

        case LOAD_ARTICLE_COMMENTS + START:
            return articles.setIn(['entities', payload.articleId, 'loadingComments'], true)

        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return articles
                .setIn(['entities', payload.articleId, 'loadingComments'], false)
                .setIn(['entities', payload.articleId, 'loadedComments'], true)

    }

    return articles
}
