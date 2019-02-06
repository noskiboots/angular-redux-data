import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthenticationService } from '../../../services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import {
    AUTHENTICATE_USER,
    AuthenticateUserAction,
    UNAUTHENTICATE_USER,
    UnauthenticatedUserSuccessAction,
    UnauthenticateUserAction,
    UserAuthenticationSuccessAction
} from './uiStateActions';
import { catchError, map, switchMap } from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable()
export class UiStateEffects {

    @Effect() authenticateUser$: Observable<Action> = this.actions$
        .pipe(
            ofType<AuthenticateUserAction>(AUTHENTICATE_USER),
            switchMap(action => {
                return this._authenticationService.login(
                    action.payload.username,
                    action.payload.password
                ).pipe(map(authUserData => {
                        sessionStorage.setItem('authenticated_user', JSON.stringify(authUserData));
                        return new UserAuthenticationSuccessAction(authUserData);
                    }),
                    catchError(() => {
                        return throwError(true);
                    }));
            }),
        );

    @Effect() unauthenticateUser$: Observable<Action> = this.actions$
        .pipe(
            ofType<UnauthenticateUserAction>(UNAUTHENTICATE_USER),
            map(() => {
                debugger;
                sessionStorage.removeItem('authenticated_user');
                return new UnauthenticatedUserSuccessAction();
            })
        );

    constructor(private actions$: Actions,
                private _authenticationService: AuthenticationService) {
    }
}
