import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {ApplicationHttpAdapter} from '../../../projects/angular-redux-data/src/lib/data-adapters/application-http-adapter';

export class CatsAdapter extends ApplicationHttpAdapter {

    constructor(protected _http: HttpClient,
                protected _host: string,
                protected _path: string,
                protected _store: Store<any>) {
        super(_http, _host, _path, _store);
    }

}
