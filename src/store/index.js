import {createStore, applyMiddleware, compose} from 'redux'
import reducer from '../reducer/index'
import logger from '../middlewares/logger'
import commentIdCreator from '../middlewares/commentIdCreator'

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose

const enhancer = composeEnhancers(
    applyMiddleware(logger, commentIdCreator)
    // other store enhancers if any
)


const store = createStore(reducer, {}, enhancer)

//dev only
window.store = store

export default store