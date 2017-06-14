import { CHANGE_LANGUAGE } from '../constants'

export default (language = 'en', action) => {
    const { type, payload } = action;

    switch (type) {
        case CHANGE_LANGUAGE:
            return payload.language
    }

    return language;
}

