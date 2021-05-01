import { UPDATE_AUTH } from '../constants';

export const updateAuthorization = (isAuth, userData) => (
    {
        type: UPDATE_AUTH,
        payload: { isAuth, userData },
    }
);