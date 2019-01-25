import {DataAdapter} from './data-adapter';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {catchError, filter, map} from 'rxjs/operators';
import {RequestConfiguration} from './request-configuration';
import {HttpAction} from './http-action';
import * as inflection from 'inflection';

export class ApplicationHttpAdapter extends DataAdapter {

    constructor(protected _http: HttpClient,
                protected _host: string,
                protected _path: string,
                protected _store: Store<any>,
                protected _config?: RequestConfiguration) {
        super(_http, _host, _path, _store, _config);
    }

    findAll(type: string, config?: RequestConfiguration): Observable<any> {
        return this.generateRequest(HttpAction.get, type, config).pipe(map(response => {
            return response;
        }));
    }

    findRecord(type: string, recordId: number | string, config?: RequestConfiguration): Observable<any> {
        return this.generateRequest(HttpAction.get, type, config, null, recordId).pipe(map(response => {
            return response;
        }));
    }

    queryAll(type: string, config?: RequestConfiguration): Observable<any> {
        return this.generateRequest(HttpAction.get, type, config).pipe(map(response => {
            return response;
        }));
    }

    createRecord(type: string, data: any, config?: RequestConfiguration): Observable<any> {
        return this.generateRequest(HttpAction.post, type, config).pipe(map(response => {
            return response;
        }));
    }

    updateRecord(type: string, recordId: number | string, data, config?: RequestConfiguration): Observable<any> {
        return this.generateRequest(HttpAction.patch, type, config).pipe(map(response => {
            return response;
        }));
    }

    deleteRecord(type: string, recordId: number | string, config?: RequestConfiguration): Observable<any> {
        return this.generateRequest(HttpAction.delete, type, config, null, recordId).pipe(map(response => {
            return response;
        }));
    }

    private generateRequest(action: HttpAction,
                            type: string,
                            config: RequestConfiguration,
                            data?: any,
                            id?: number | string): Observable<any> {
        const url = `${this._host}${this._path ? `/${this._path}` : ''}/${inflection.pluralize(type).toLowerCase()}`;
        const headers = config && config.headers ? config.headers : new HttpHeaders().set('Content-Type', 'json/application');
        const options = {headers, params: config ? config.parameters : {}};
        switch (action) {
            case HttpAction.get:
                return this._getRequest(url, options, id);
                break;
            case HttpAction.post:
                return this._postRequest(url, options, data);
                break;
            case HttpAction.patch:
                return this._patchRequest(url, options, data);
                break;
            case HttpAction.delete:
                return this._deleteRequest(url, options, id);
                break;
            default:
                console.log('Invalid Http Action');
                throwError('Invalid Http Action');
        }
    }

    private _getRequest(url: string, options: any, id: number | string): Observable<any> {
        url = `${url}${id ? `/${id}` : ''}`;
        return this._http.get(url, options).pipe(
            filter(response => !!response),
            map(response => {
                if (response) {
                    return response;
                }
            }),
            catchError(err => {
                console.log(`Request Error: ${err}`);
                return throwError(err);
            })
        );
    }

    private _postRequest(url: string, options: any, data: any): Observable<any> {
        return this._http.post(url, data, options).pipe(
            map(response => response),
            catchError(err => {
                console.log(`Request Error: ${err}`);
                return throwError(err);
            })
        );
    }

    private _patchRequest(url: string, options: any, data: any): Observable<any> {
        return this._http.post(url, data, options).pipe(
            map(response => response),
            catchError(err => {
                console.log(`Request Error: ${err}`);
                return throwError(err);
            })
        );
    }

    private _deleteRequest(url: string, options: any, id: number | string): Observable<any> {
        url = `${url}/${id}`;
        return this._http.get(url, options).pipe(
            map(response => response),
            catchError(err => {
                console.log(`Request Error: ${err}`);
                return throwError(err);
            })
        );
    }
}
