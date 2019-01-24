import {HttpHeaders, HttpParams} from '@angular/common/http';

export class RequestConfiguration {
    headers: HttpHeaders;
    parameters: HttpParams;
    authorization: any; // @TODO make opinionated object structure with "data" for custom auth
    metadata: any;
}
