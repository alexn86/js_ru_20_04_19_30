import $ from 'jquery'
import {SUCCESS, FAIL, START} from '../constants'

export default store => next => action => {
    const {callAPI, type, ...rest} = action
    if (!callAPI) return next(action)
    next({...rest, type: type + START})

    //DEV ONLY, remove in prod
    setTimeout(() => {
        $.get(callAPI)
            .done(response => next({...rest, type: type + SUCCESS, response}))
            .fail(error => next({...rest, type: type + FAIL, error}))
    }, 1000)
}
