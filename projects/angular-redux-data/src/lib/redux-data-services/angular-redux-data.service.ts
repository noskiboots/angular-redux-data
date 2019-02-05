import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {ReduxDataSelectorsService} from './redux-data.selectors.service';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../../../../src/app/rx-data.config';
import {Observable, of, throwError} from 'rxjs';
import {catchError, filter, first} from 'rxjs/operators';
import {v4 as uuid} from 'uuid';
import {ReduxDataActionsService} from './redux-data.actions.service';
import {flatMap} from 'rxjs/internal/operators';

enum TransactionType {
    'findAll' = 'Find All',
    'findRecord' = 'Find Record',
    'queryAll' = 'Query All',
    'create' = 'Create',
    'update' = 'Update',
    'delete' = 'Delete'
}

enum SelectorType {
    'selectAll',
    'selectById',
    'selectByIds',

}

@Injectable({
    providedIn: 'root',
})
export class AngularReduxDataService {
    constructor(private actions: Actions,
                private actionsService: ReduxDataActionsService,
                private selectorsService: ReduxDataSelectorsService,
                private store: Store<ApplicationState>) {
    }

    public findAll(entityNamespace): Observable<any> {
        const transactionId = uuid();
        this.generateNewTransaction(transactionId, entityNamespace, TransactionType.findAll);
        this.store.dispatch(new this.actionsService.actions[entityNamespace].FindAll(entityNamespace, transactionId));
        return this.streamAfterTransactionCompleted(entityNamespace, transactionId, SelectorType.selectAll);
    }

    public findRecord(entityNamespace: string, id: string | number): Observable<any> {
        const transactionId = uuid();
        this.generateNewTransaction(transactionId, entityNamespace, TransactionType.findRecord);
        this.store.dispatch(new this.actionsService.actions[entityNamespace].FindRecord(entityNamespace, id, transactionId));
        return this.streamAfterTransactionCompleted(entityNamespace, transactionId, SelectorType.selectById);
    }

    public queryAll(entityNamespace: string, params: any): Observable<any> {
        const transactionId = uuid();
        this.generateNewTransaction(transactionId, entityNamespace, TransactionType.queryAll);
        this.store.dispatch(new this.actionsService.actions[entityNamespace].QueryAll(entityNamespace, params, transactionId));
        return this.streamAfterTransactionCompleted(entityNamespace, transactionId, SelectorType.selectByIds);

    }

    public create(entityNamespace: string, data: any) {
        const transactionId = uuid();
        this.generateNewTransaction(transactionId, entityNamespace, TransactionType.create);
        this.store.dispatch(new this.actionsService.actions[entityNamespace].Create(entityNamespace, data, transactionId));
        return this.streamAfterTransactionCompleted(entityNamespace, transactionId, SelectorType.selectById, true);
    }

    public update(entityNamespace: string, id: string | number, data: any): Observable<any> {
        const transactionId = uuid();
        this.generateNewTransaction(transactionId, entityNamespace, TransactionType.update);
        this.store.dispatch(new this.actionsService.actions[entityNamespace].Update(entityNamespace, id, data, transactionId));
        return this.streamAfterTransactionCompleted(entityNamespace, transactionId, SelectorType.selectById, true);
    }

    public delete(entityNamespace: string, id: string | number): Observable<any> {
        const transactionId = uuid();
        this.generateNewTransaction(transactionId, entityNamespace, TransactionType.delete);
        this.store.dispatch(new this.actionsService.actions[entityNamespace].Delete(entityNamespace, id, transactionId));
        return this.streamAfterTransactionCompleted(entityNamespace, transactionId, null, false);
    }

    public peekAll(entityNamespace: string): Observable<any> {
        return this.store.pipe(
            select(this.selectorsService.getSelector(entityNamespace).selectAll())
        );
    }

    public peekRecord(entityNamespace: string, id: string | number): Observable<any> {
        return this.store.pipe(
            select(this.selectorsService.getSelector(entityNamespace).selectById(id))
        );
    }

    public peekBy(entityNamespace: string, params: {}): Observable<any> {
        return this.store.pipe(
            select(this.selectorsService.getSelector(entityNamespace).selectByParameters(params))
        );
    }

    private streamAfterTransactionCompleted(entityNamespace, transactionId, selectorType: SelectorType, emitOnce = false) {
        return this.store.pipe(
            select(this.selectorsService.getSelector('ardTransaction').selectById(transactionId)),
            filter(transaction => transaction && (transaction.success || transaction.failed)),
            flatMap((transaction) => {
                if (transaction.success) {
                    if (!emitOnce) {
                        return this.getSelector(entityNamespace, transaction, selectorType);
                    } else {
                        return this.onceAfterTransactionCompleted(entityNamespace, transaction);
                    }
                } else if (transaction.failed) {
                    return throwError(transaction);
                }
            }),
            catchError(err => {
                return throwError(err);
            }));
    }

    private getSelector(entityNamespace, transaction, selectorType) {
        let selector;
        switch (selectorType) {
            case SelectorType.selectAll:
                selector = this.store.pipe(
                    select(this.selectorsService.getSelector(entityNamespace).selectAll())
                );
                break;
            case SelectorType.selectById:
                selector = this.store.pipe(
                    select(this.selectorsService.getSelector(entityNamespace).selectById(transaction.entities[0]))
                );
                break;
            case SelectorType.selectByIds:
                selector = this.store.pipe(
                    select(this.selectorsService.getSelector(entityNamespace).selectByIds(transaction.entities)),
                );
                break;
            default:
                selector = of(true);
        }
        return selector;
    }

    private onceAfterTransactionCompleted(entityNamespace, transaction) {
        return this.store.pipe(
            select(this.selectorsService.getSelector(entityNamespace).selectById(transaction.entities[0])),
            first(entity => !!entity));
    }

    private generateNewTransaction(id, entityNamespace, type: TransactionType) {
        this.store.dispatch(new this.actionsService.actions['ardTransaction'].CreateSuccess('ardTransactions', {
            id,
            entityNamespace,
            type,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            entities: []
        }));
    }
}
