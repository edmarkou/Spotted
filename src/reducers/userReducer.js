import { UPDATE_AUTH } from '../constants';

const INITIAL_STATE = {
    isAuth: false,
    loading: true
};
 
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_AUTH:
            if (action.payload.isAuth) {
                return {  ...state, ...action.payload?.userData, isAuth: action.payload.isAuth, loading: false };
            } else {
                return {  isAuth: false, loading: false };
            };
        default:
            return state
    }
};