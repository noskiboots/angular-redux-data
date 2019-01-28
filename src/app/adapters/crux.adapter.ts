import {DataAdapter} from '../../../projects/angular-redux-data/src/lib/data-adapters/data-adapter';
import {Observable} from 'rxjs/';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {of, throwError} from 'rxjs/index';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../rx-data.config';
import {environment} from '../../environments/environment';

export class ApiRequest {
    token: string;
    data: string;
    method?: string;
    resource?: string;
}

export interface ApiResponse {
    status: number;
    statusMessage: string;
    details?: any;
    items?: any;
}

export class CruxAdapter extends DataAdapter {

    constructor(protected _http: HttpClient,
                protected _host: string,
                protected _path: string,
                protected authUser: any,
                protected _store: Store<ApplicationState>) {
        super(_http, _host, _path, _store);
    }

    findAll(type: string, config: { customProperties: string, aggregate: boolean, page: number }): Observable<any[]> {
        return this._apiRequest(type, 'getItemsByFilter', {}, false).pipe(
            map((apiResponse: ApiResponse) => {
                return apiResponse.items;
            }));
    }

    queryAll(type: string, params: {}): Observable<any> {
        return this._apiRequest(type, 'getItemsByFilter', params, false).pipe(
            map((apiResponse: ApiResponse) => {
                return apiResponse.items;
            }));
    }

    findRecord(type: string, recordId: string | number): Observable<any> {
        return this._apiRequest(type, 'getItem', {id: recordId}).pipe(
            map((apiResponse: ApiResponse) => {
                return apiResponse;
            }));
    }

    createRecord(type: string, data: any): Observable<any> {
        return this._apiRequest(type, 'createItem', data).pipe(
            map((apiResponse: ApiResponse) => {
                return apiResponse;
            })
        );
    }

    updateRecord(type: string, recordId: number | string, data): Observable<any> {
        data.id = recordId;
        return this._apiRequest(type, 'updateItem', data).pipe(
            map((apiResponse: ApiResponse) => {
                return apiResponse;
            })
        );
    }

    deleteRecord(type: string, recordId: string | number): Observable<any> {
        const request = {
            id: recordId,
            clientMasterId: this.authUser.clientMasterId,
            type: 'cancel'
        };
        return this._apiRequest(type, 'deleteItem', request).pipe(
            map(() => {
                return true;
            }),
            catchError(() => {
                console.error('Unable to delete entity');
                return of(false);
            })
        );
    }

    private _apiRequest(type: string, method: string, data: Object, aggregateMethod?: any): Observable<any> {
        data = Object.assign({}, data);
        const url = `${this._host}${this._path}${method}`;
        data['returnRecursive'] = false;
        const request: ApiRequest = {
            token: '793a582f1081f3cbb6f36359925be09507321c901ee61bc3bab4daab9fe18d83',
            resource: type,
            data: JSON.stringify(data),
        };
        if (aggregateMethod) {
            delete request.resource;
        }
        const body = JSON.stringify(request);
        const headers = new HttpHeaders().set('Content-Type', 'text/plain');
        // const options = new RequestOptions({ headers: headers });
        return this._http
            .post(url, body, {headers})
            .pipe(
                map((response: ApiResponse) => {
                    if (response.status === 0) {
                        return response.details;
                    } else {
                        console.error('BaseService._apiRequest: API returned status code ' + response.status);
                        throw new Error(response.status.toString());
                    }
                }),
                catchError(error => {
                    if (error.error && error.error.status === 2) {
                        // this._store.dispatch(new UnauthenticateUserAction());
                    }
                    console.error('BaseService._apiRequest: Error communicating with the API!', error);
                    return throwError(error);
                })
            );
    }
}
