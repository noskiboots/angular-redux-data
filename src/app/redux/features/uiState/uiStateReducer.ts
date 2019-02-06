import { UiState, INITIAL_UI_STATE } from './ui-state';
import { Action } from '@ngrx/store';
import {
    AUTHENTICATION_FAILED,
    AUTHENTICATION_SUCCESS,
    ERROR_OCCURRED_ACTION,
    ErrorOccurredAction,
    LOADED_APPOINTMENT,
    LOADED_CLIENT,
    LoadedAppointmentAction, LoadedClientAction, UNAUTHENTICATE_USER,
    UNAUTHENTICATION_SUCCESS, UPDATE_MOBILE_REACTIVE_STATE, UpdateMobileReactiveStateAction,
    UserAuthenticationSuccessAction
} from './uiStateActions';


export function uiState(state: UiState = INITIAL_UI_STATE, action: Action): UiState {
    switch (action.type) {
        case AUTHENTICATION_SUCCESS:
            return handleSetAuthenticatedUserAction(state, <any>action);
            case AUTHENTICATION_FAILED:
            return handleSetAuthenticationError(state, <any>action);
        case UNAUTHENTICATION_SUCCESS:
            debugger;
            return handleUnauthenticatedUserAction(state);
        case UNAUTHENTICATE_USER:
            debugger;
            return handleUnauthenticatedUserAction(state);
        case LOADED_CLIENT:
            return handleLoadedClient(state, <any>action);
        case ERROR_OCCURRED_ACTION:
            return handleErrorOccurredAction(state, <any>action);
        case UPDATE_MOBILE_REACTIVE_STATE:
            return handleUpdateMobileReactiveState(state, <any>action);
        default:
            return state;
    }

}

function handleSetAuthenticatedUserAction(state: UiState, action: UserAuthenticationSuccessAction) {
    const newState = Object.assign({}, state);
    newState.loggedInUser = action.payload;
    newState.authenticationFails = 0;
    return newState;
}

function handleSetAuthenticationError(state: UiState, action: UserAuthenticationSuccessAction) {
    const newState = Object.assign({}, state);
    newState.authenticationFails = state.authenticationFails + 1;
    return newState;
}

function handleUnauthenticatedUserAction(state: UiState) {
    sessionStorage.removeItem('authenticated_user');
    const newState = Object.assign({}, state);
    newState.loggedInUser = undefined;
    return newState;
}


function handleLoadedClient(state: UiState,  action: LoadedClientAction) {
    const newState = Object.assign({}, state);
    newState.currentClient = action.payload;
    return newState;
}

function handleErrorOccurredAction(state: UiState, action: ErrorOccurredAction) {

    const newUiState = Object.assign({}, state);

    newUiState.currentError = action.payload;

    return newUiState;
}

function handleUpdateMobileReactiveState(state: UiState, action: UpdateMobileReactiveStateAction) {
    const newUiState = Object.assign({}, state);
    newUiState.bottomPanelDisplayed = action.payload;
    return newUiState;
}














