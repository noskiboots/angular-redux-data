import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs/index';
import {ApiResponse} from '../adapters/crux.adapter';

export enum AuthenticationResource {
    'application' = 'Application',
}

class AuthenticationPayload {
    data: string;
    resource: AuthenticationResource;
    interface: string;
}

@Injectable()
export class AuthenticationService {
    private host = 'https://development.appointment-plus.com/';
    private path = 'api/v2.0.18.1/Rest/';

    constructor(protected _http: HttpClient) {
    }

    public login(username: string, password: string) {
        const body = new AuthenticationPayload();
        // body.data = `{\"username\": \"${username}\",\"password\": \"${password}\", \"authenticationEntity\": \"customer\"}`;
        body.data = `{\"username\": \"${username}\",\"password\": \"${password}\", \"clientMasterId\": \"1269522\"}`;
        body.resource = AuthenticationResource.application;
        body['authenticationEntity'] = 'customer';
        body.interface = 'f6ef532780548f1a27f4bfee77cff048';
        const headers = new HttpHeaders().set('Content-Type', 'text/plain');
        const url = `${this.host}${this.path}GetAuthenticationToken`;
        return this._http.post(url, body, {headers}).pipe(map((response: ApiResponse) => {
                switch (response.status) {
                    case 0:
                        return response.details;
                    case 2:
                        throw new Error('Username and/or password are incorrect.');
                }
            }),
            catchError(error => {
                return throwError(error);
            })
        );
    }

    public logout() {
    }
}
