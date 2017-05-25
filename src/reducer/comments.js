import {normalizedComments as defaultComments} from '../fixtures'
import {ADD_COMMENT, LOAD_ALL_COMMENTS, START, SUCCESS, FAIL} from '../constants'
import {arrayToMap} from '../utils'
import {OrderedMap, Record} from 'immutable'

const CommentModel = Record({
    id: null,
    user: null,
    text: ''
});

// const DefaultReducerState = Record({
//     entities: new OrderedMap({})
// });

// export default (comments = arrayToMap(defaultComments), action) => {
// export default (comments = DefaultReducerState(), action) => {
//давай комменты хранить в такой же структуре, как и статьи. Иначе быстро запутаешься
export default (comments = new OrderedMap({}), action) => {
    const {type, payload, response, randomId} = action
    switch (type) {
        case ADD_COMMENT:
            return comments.set(randomId, {
                ...payload.comment,
                id: randomId
            })
        // case LOAD_ALL_COMMENTS + START:
        //     return comments.setIn(['loading'], true);
        case LOAD_ALL_COMMENTS + SUCCESS:
            return comments.merge(arrayToMap(response, CommentModel));
    }

    return comments
}
