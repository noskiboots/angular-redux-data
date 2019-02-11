import {TransactionType} from '../redux-services/angular-redux-data.service';


export class ArdTransaction {
    id: string; // Unique identifier for every transaction
    type: TransactionType; // see TransactionType
    entityNamespace: string;
    createdAt: number;
    updatedAt: number;
    success: boolean; // true if api request returns success
    failed: boolean; // true if api request returns error
    error: any; // error returned via failed network request
    entities: string[] | number[]; // list of ids in Redux store related to the transaction
}
