import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import counterReducer from './counter'
import articles from './articles'
import comments from './comments'
import filters from './filters'
import error from './error'

export default combineReducers({
    counter: counterReducer,
    articles, comments, filters, error,
    router: routerReducer
})