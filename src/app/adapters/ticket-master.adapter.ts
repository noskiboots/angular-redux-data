import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {DataAdapter} from '../../../projects/angular-redux-data/src/lib/data-adapters/data-adapter';
import {Observable, throwError} from 'rxjs';
import {uiState} from '../redux/features/uiState/uiStateReducer';
import {catchError, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {UiState} from '../redux/features/uiState/ui-state';
import {Event} from '../../../shared/event';

export class TicketMasterAdapter extends DataAdapter {
    private apiKey: string;

    constructor(protected http: HttpClient,
                protected host: string,
                protected path: string,
                protected store: Store<any>) {
        super(http, host, path, store);
        this._store.select('uiState')
            .pipe(
                distinctUntilChanged((a, b) => {
                    return JSON.stringify(a) === JSON.stringify(b);
                })
            )
            .subscribe((uiState$: UiState) => {
                this.apiKey = uiState$.ticketMasterApiKey;
            });
    }

    createRecord(type: string, data: any): Observable<any> {
        return throwError('Whoa you only have read access');
    }

    deleteRecord(type: string, recordId: number | string): Observable<any> {
        return throwError('Whoa you only have read access');
    }

    findAll(type: string, config?: {}): Observable<any[]> {
        if (!!this.apiKey) {
            const url = `${this.host}/${this.path}/${type}.json`;
            const headers = new HttpHeaders();
            const options = {headers: headers, params: {apikey: this.apiKey}};
            return this.http.get(url, options)
                .pipe(
                    filter(response => !!response),
                    map(response => {
                        if (response['_embedded']) {
                            return response['_embedded'].events;
                        }
                    }),
                    catchError(error => {
                        return throwError(error);
                    })
                );
        } else {
            return throwError('Invalid API Key provided');
        }
    }

    findRecord(type: string, recordId: number | string, config?: {}): Observable<any> {
        if (!!this.apiKey) {
            const url = `${this.host}${this.path}/${type}.json`;
            const headers = new HttpHeaders().set('Content-Type', 'application/json');
            const options = {headers: headers, params: {apikey: this.apiKey}};
            return this.http.get(url, options)
                .pipe(
                    filter(response => !!response),
                    map(rawEventData => {
                        return this.extractRelevantEventData(rawEventData);
                    }),
                    catchError(error => {
                        return throwError(error);
                    })
                );
        } else {
            return throwError('Invalid API Key provided');
        }
    }

    queryAll(type: string, params: {}): Observable<any> {
        if (!!this.apiKey) {
            const url = `${this.host}${this.path}/${type}.json`;
            const headers = new HttpHeaders().set('Content-Type', 'application/json');
            params['apikey'] = this.apiKey;
            const options = {headers: headers, params};
            return this.http.get(url, options)
                .pipe(
                    filter(response => !!response),
                    map(response => {
                        const events = response['_embedded'].events.map(rawEventData => {
                            return this.extractRelevantEventData(rawEventData);
                        });
                        return events;
                    }),
                    catchError(error => {
                        return throwError(error);
                    })
                );
        } else {
            return throwError('Invalid API Key provided');
        }
    }

    updateRecord(type: string, recordId: number | string, data): Observable<any> {
        return throwError('Whoa you only have read access');
    }

    private extractRelevantEventData(rawEventData) {
        const event = {} as Event;
        event.id = rawEventData.id;
        event.dates = rawEventData.dates;
        event.locale = rawEventData.locale;
        event.eventUrl = rawEventData.eventUrl;
        event.name = rawEventData.name;
        event.promoterId = rawEventData.promoterId;
        event.type = rawEventData.type;
        return event;
    }

}
