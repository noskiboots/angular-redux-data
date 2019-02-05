import {DataAdapter} from './data-adapter';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {catchError, filter, map} from 'rxjs/operators';
import {RequestConfiguration} from './request-configuration';
import {HttpAction} from './http-action';

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
        }), catchError((err) => throwError(err)));

    }

    findRecord(type: string, recordId: number | string, config?: RequestConfiguration): Observable<any> {
        return this.generateRequest(HttpAction.get, type, config, null, recordId).pipe(map(response => {
            return response;
        }), catchError((err) => throwError(err)));

    }

    queryAll(type: string, config?: RequestConfiguration): Observable<any> {
        return this.generateRequest(HttpAction.get, type, config).pipe(map(response => {
            return response;
        }), catchError((err) => throwError(err)));
    }

    createRecord(type: string, data: any, config?: RequestConfiguration): Observable<any> {
        return this.generateRequest(HttpAction.post, type, config, data).pipe(map(response => {
            return response;
        }), catchError((err) => throwError(err)));
    }

    updateRecord(type: string, recordId: number | string, data, config?: RequestConfiguration): Observable<any> {
        return this.generateRequest(HttpAction.patch, type, config, data, recordId).pipe(map(response => {
            return response;
        }), catchError((err) => throwError(err)));
    }

    deleteRecord(type: string, recordId: number | string, config?: RequestConfiguration): Observable<any> {
        return this.generateRequest(HttpAction.delete, type, config, null, recordId).pipe(map(response => {
            return response;
        }), catchError((err) => throwError(err)));
    }

    private generateRequest(action: HttpAction,
                            type: string,
                            config: RequestConfiguration,
                            data?: any,
                            id?: number | string): Observable<any> {
        const url = `${this._host}${this._path ? `/${this._path}` : ''}/${type}`;
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
                return this._patchRequest(url, options, id, data);
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
                return throwError(err);
            })
        );
    }

    private _postRequest(url: string, options: any, data: any): Observable<any> {
        return this._http.post(url, data, options).pipe(
            map(response => response),
            catchError(err => {
                return throwError(err);
            })
        );
    }

    private _patchRequest(url: string, options: any, id: string | number, data: any): Observable<any> {
        url = `${url}${id ? `/${id}` : ''}`;
        return this._http.patch(url, data, options).pipe(
            map(response => response),
            catchError(err => {
                return throwError(err);
            })
        );
    }

    private _deleteRequest(url: string, options: any, id: number | string): Observable<any> {
        url = `${url}${id ? `/${id}` : ''}`;
        return this._http.delete(url, options).pipe(
            map(response => response),
            catchError(err => {
                return throwError(err);
            })
        );
    }
}
