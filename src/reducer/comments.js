import {normalizedComments as defaultComments} from '../fixtures'
import { ADD_COMMENT } from '../constants'

const commentMap = defaultComments.reduce((acc, comment) => ({
    ...acc, [comment.id]: comment
}), {})

export default (comments = commentMap, action) => {
    const {type, payload} = action
    switch (type) {
        case ADD_COMMENT:
            const {id, user, text} = payload;
            return {...comments, [id]: {id, user, text}}
    }

    return comments
}
