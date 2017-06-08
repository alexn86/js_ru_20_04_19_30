import { ADD_COMMENT, LOAD_ARTICLE_COMMENTS, LOAD_COMMENTS_FOR_PAGE, START, SUCCESS } from '../constants'
import {arrayToMap} from '../utils'
import {OrderedMap, Map, Record} from 'immutable'

const CommentModel = Record({
    id: null,
    text: '',
    user: ''
})

const DefaultReducerState = Record({
    entities: new OrderedMap({}),
    pagination: new Map({}),
    total: null
})


export default (comments = new DefaultReducerState(), action) => {
    const { type, payload, response, randomId } = action

    switch (type) {
        case ADD_COMMENT:
            return comments.setIn(['entities', randomId], new CommentModel({
                ...payload.comment,
                id: randomId
            }))

        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return comments.mergeIn(['entities'], arrayToMap(response, CommentModel))

        case LOAD_COMMENTS_FOR_PAGE + START:
            return comments.setIn(['pagination', payload.page, 'loading'], true)

        case LOAD_COMMENTS_FOR_PAGE + SUCCESS:
            return comments
                .set('total', response.total)
                .mergeIn(['entities'], arrayToMap(response.records, CommentModel))
                .setIn(['pagination', payload.page, 'ids'], response.records.map(comment => comment.id))
                .setIn(['pagination', payload.page, 'loading'], false)
    }

    return comments
}