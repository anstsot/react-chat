import history from '../utils/history';
import * as types from '../constants';

export function redirect(to) {
    return (dispatch) => {
        history.push(`${process.env.PUBLIC_URL}/${to}`);
        dispatch({
            types: types.REDIRECT,
            payload: { to },
        });
    }
}
