import { ADD_COMMENT } from '../constants'

export default store => next => action => {
    const {type, payload} = action;
    switch (type) {
        case ADD_COMMENT:
            const { comments } = store.getState();
            action.payload.id = +Object.keys(comments).reduce((acc, id) => (+id > +acc ? id : acc)) + 1;
    }
    next(action);
}