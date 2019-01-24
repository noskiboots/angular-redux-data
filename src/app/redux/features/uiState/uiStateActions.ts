import { Action } from '@ngrx/store';

export const ERROR_OCCURRED_ACTION = 'ERROR_OCCURRED_ACTION';

export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const UNAUTHENTICATION_SUCCESS = 'UNAUTHENTICATION_SUCCESS';

export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const UNAUTHENTICATE_USER = 'UNAUTHENTICATE_USER';

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
