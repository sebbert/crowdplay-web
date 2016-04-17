import { createAction } from 'redux-actions';

export const PUSH_ERROR = "PUSH_ERROR";
export const pushError = createAction(PUSH_ERROR);

export const POP_ERROR = "POP_ERROR";
export const popError = createAction(POP_ERROR);

export function showError(message, seconds) {
	seconds = seconds || 3;
	return (dispatch, getState) => {
		dispatch(pushError(message));

		setTimeout(() => dispatch(popError()), seconds * 1000);
	}
}