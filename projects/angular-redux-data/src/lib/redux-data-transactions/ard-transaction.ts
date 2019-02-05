import {TransactionType} from '../redux-data-services/angular-redux-data.service';


export class ArdTransaction {
    id: string;
    type: TransactionType;
    entityNamespace: string;
    createdAt: number;
    updatedAt: number;
    success: boolean;
    failed: boolean;
    error: any;
    entities: string[] | number[];
}
