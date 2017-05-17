import { INCREMENT, DELETE_ARTICLE, FILTER_CHANGED } from '../constants'

export function increment() {
    const action = {
        type: INCREMENT
    }
    return action
}

export function deleteArticle(id) {
    return {
        type: DELETE_ARTICLE,
        payload : { id }
    }
}

export function filterSelect(selection, articles, filters) {
    return {
        type: FILTER_CHANGED,
        payload: { selection, articles, filters }
    }
}

export function filterDate(date, articles, filters) {
    return {
        type: FILTER_CHANGED,
        payload: { date, articles, filters }
    }
}