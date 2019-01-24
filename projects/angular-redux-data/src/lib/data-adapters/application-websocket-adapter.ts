import {DataAdapter} from './data-adapter';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';

// @TODO build dis out
export class ApplicationWebsocketAdapter extends DataAdapter {
    createRecord(type: string, data: any): Observable<any> {
        return undefined;
    }

    deleteRecord(type: string, recordId: number | string): Observable<any> {
        return undefined;
    }

    findAll(type: string, config?: {}): Observable<any[]> {
        return undefined;
    }

    findRecord(type: string, recordId: number | string, config?: {}): Observable<any> {
        return undefined;
    }

    queryAll(type: string, params: {}): Observable<any> {
        return undefined;
    }

    updateRecord(type: string, recordId: number | string, data): Observable<any> {
        return undefined;
    }


    constructor(protected _http: HttpClient,
                protected _host: string,
                protected _path: string,
                protected _store: Store<any>,
                protected _config: any) {
        super(_http, _host, _path, _store, _config);
    }
}
