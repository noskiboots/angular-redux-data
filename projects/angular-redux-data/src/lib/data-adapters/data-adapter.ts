import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {RequestConfiguration} from './request-configuration';
import * as inflection from 'inflection';


export abstract class DataAdapter {
    protected inflection = inflection;

    abstract findAll(type: string, config?: {}): Observable<any[]>;

    abstract findRecord(type: string, recordId: number | string, config?: {}): Observable<any>;

    abstract queryAll(type: string, params: {}): Observable<any>;

    abstract createRecord(type: string, data: any): Observable<any>;

    abstract updateRecord(type: string, recordId: number | string, data): Observable<any>;

    abstract deleteRecord(type: string, recordId: number | string): Observable<any>;


    constructor(protected _http: HttpClient,
                protected _host: string,
                protected _path: string,
                protected _store: Store<any>,
                protected _config?: RequestConfiguration) {
    }
}
