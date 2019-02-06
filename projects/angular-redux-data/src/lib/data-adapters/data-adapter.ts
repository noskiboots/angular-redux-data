import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {RequestConfiguration} from './request-configuration';
import {store} from '@angular/core/src/render3';


export abstract class DataAdapter {
    abstract findAll(type: string, config?: {}): Observable<any[]>;

    abstract findRecord(type: string, recordId: number | string, config?: {}): Observable<any>;

    abstract queryAll(type: string, params: {}): Observable<any>;

    abstract createRecord(type: string, data: any): Observable<any>;

    abstract updateRecord(type: string, recordId: number | string, data): Observable<any>;

    abstract deleteRecord(type: string, recordId: number | string): Observable<any>;


    constructor(protected _http: HttpClient,
                protected _host: string,
                protected _path: string,
                protected _store?: Store<any>,
                protected _config?: RequestConfiguration) {
    }
}
