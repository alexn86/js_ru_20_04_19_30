import { FILTER_CHANGED } from '../constants';

export default (filter = { selection: [], date: {}}, action) => {
    const {type, payload} = action;
    const obj = Object.assign({}, filter);

    switch (type) {
        case FILTER_CHANGED:
            if (payload.selection) {
                obj.selection = payload.selection;
            } else if (payload.date) {
                obj.date = payload.date;
            }
            return obj;
    }

    return filter;
}