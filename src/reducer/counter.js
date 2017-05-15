import {INCREMENT} from '../constants'

export default (number = 0, action) => {
    const {type} = action
    return type == INCREMENT ? number + 1 : number
}