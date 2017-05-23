import {normalizedComments as defaultComments} from '../fixtures'
import {ADD_COMMENT} from '../constants'
import {arrayToMap} from '../utils'

export default (comments = arrayToMap(defaultComments), action) => {
    const {type, payload, randomId} = action
    switch (type) {
        case ADD_COMMENT:
            return comments.set(randomId, {
                ...payload.comment,
                id: randomId
            })
    }

    return comments
}
