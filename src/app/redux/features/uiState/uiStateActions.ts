import { Action } from '@ngrx/store';
import { Client } from '../../../../../shared/client';

export const ERROR_OCCURRED_ACTION = 'ERROR_OCCURRED_ACTION';

export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED';

export const UNAUTHENTICATION_SUCCESS = 'UNAUTHENTICATION_SUCCESS';

export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const UNAUTHENTICATE_USER = 'UNAUTHENTICATE_USER';

export const LOADED_APPOINTMENT = 'LOADED_APPOINTMENT';

export const UPDATE_MOBILE_REACTIVE_STATE = 'UPDATE MOBILE REACTIVE STATE';

export const LOADED_CLIENT = 'LOADED_CLIENT';

export class AuthenticateUserAction implements Action {

    readonly type = AUTHENTICATE_USER;

    constructor(public payload?: any) {
    }

}

export class UnauthenticateUserAction implements Action {
    readonly type = UNAUTHENTICATE_USER;

    constructor() {
    }
}

export class UserAuthenticationSuccessAction implements Action {

    readonly type = AUTHENTICATION_SUCCESS;

    constructor(public payload?: any) {
    }

}

export class UserAuthenticationFailedAction implements Action {

    readonly type = AUTHENTICATION_FAILED;

    constructor(public payload?: any) {
    }

}
export class UnauthenticatedUserSuccessAction implements Action {

    readonly type = UNAUTHENTICATION_SUCCESS;

    constructor() {
    }

}

export class ErrorOccurredAction implements Action {

    readonly type = ERROR_OCCURRED_ACTION;

    constructor(public payload?: string) {

    }
}

export class LoadedAppointmentAction implements Action {

    readonly type = LOADED_APPOINTMENT;

    constructor(public payload?: any) {
    }

}

export class UpdateMobileReactiveStateAction implements Action {

    readonly type = UPDATE_MOBILE_REACTIVE_STATE;

    constructor(public payload?: any) {
    }

}
export class LoadedClientAction implements Action {

    readonly type = LOADED_CLIENT;

    constructor(public payload?: Client) {
    }

}












