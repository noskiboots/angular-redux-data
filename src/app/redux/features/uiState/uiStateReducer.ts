import { UiState, INITIAL_UI_STATE } from './ui-state';
import { Action } from '@ngrx/store';
import {
    AUTHENTICATION_SUCCESS,
    ERROR_OCCURRED_ACTION,
    ErrorOccurredAction,
    UNAUTHENTICATION_SUCCESS,
    UserAuthenticationSuccessAction
} from './uiStateActions';


export function uiState(state: UiState = INITIAL_UI_STATE, action: Action): UiState {
    switch (action.type) {
        case AUTHENTICATION_SUCCESS:
            return handleSetAuthenticatedUserAction(state, <any>action);
        case UNAUTHENTICATION_SUCCESS:
            return handleUnauthenticatedUserAction(state);
        case ERROR_OCCURRED_ACTION:
            return handleErrorOccurredAction(state, <any>action);
        default:
            return state;
    }

}

function handleSetAuthenticatedUserAction(state: UiState, action: UserAuthenticationSuccessAction) {
    const newState = Object.assign({}, state);
    newState.loggedInUser = action.payload;
    return newState;
}

function handleUnauthenticatedUserAction(state: UiState) {
    const newState = Object.assign({}, state);
    newState.loggedInUser = undefined;
    return newState;
}
function handleErrorOccurredAction(state: UiState, action: ErrorOccurredAction) {

    const newUiState = Object.assign({}, state);

    newUiState.currentError = action.payload;

    return newUiState;
}














