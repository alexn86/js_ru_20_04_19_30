import $ from 'jquery'
import { INCREMENT, DELETE_ARTICLE, CHANGE_DATE_RANGE, CHANGE_SELECTION, ADD_COMMENT, LOAD_ALL_ARTICLES,
    LOAD_ARTICLE, LOAD_ARTICLE_COMMENTS, LOAD_COMMENTS_FOR_PAGE, START, SUCCESS, FAIL } from '../constants'
import {push, replace} from 'react-router-redux'

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

export function changeDateRange(dateRange) {
    return {
        type: CHANGE_DATE_RANGE,
        payload: { dateRange }
    }
}

export function changeSelection(selected) {
    return {
        type: CHANGE_SELECTION,
        payload: { selected }
    }
}

export function addComment(comment, articleId) {
    return {
        type: ADD_COMMENT,
        payload: { comment, articleId },
        generateId: true
    }
}

export function loadAllArticles() {
    return {
        type: LOAD_ALL_ARTICLES,
        callAPI: '/api/article'
    }
}

export function loadArticlesComments(articleId) {
    return {
        type: LOAD_ARTICLE_COMMENTS,
        callAPI: `/api/comment?article=${articleId}`,
        payload: { articleId }
    }
}

export function loadArticle(id) {
    return (dispatch) => {
        dispatch({
            type: LOAD_ARTICLE + START,
            payload: { id }
        })

        setTimeout(() => {
            $.get(`/api/article/${id}`)
                .done(response => dispatch({
                    type: LOAD_ARTICLE + SUCCESS,
                    payload: {response, id}
                }))
                .fail(error => {
                    dispatch({
                        type: LOAD_ARTICLE + FAIL,
                        payload: {error, id}
                    })

                    dispatch(replace('/error'))
                })
        }, 500)
    }
}

export function loadCommentsForPage(page) {
    return {
        type: LOAD_COMMENTS_FOR_PAGE,
        payload: { page },
        callAPI: `/api/comment?limit=5&offset=${(page - 1) * 5}`
    }
}