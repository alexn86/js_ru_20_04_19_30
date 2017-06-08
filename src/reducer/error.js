import { LOAD_ARTICLE, FAIL } from '../constants'

export default (errorState = null, action) => {
    const { type, payload, response, error } = action

    switch (type) {
        case LOAD_ARTICLE + FAIL:
            return payload.error
    }

    return errorState
}