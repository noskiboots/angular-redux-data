export class TicketMasterEventDate {
    dateTime: string;
    localDate: string;
    localTime: string;
}

export class TicketMasterEventDateDisplayOptions {
    range: TicketMasterEventDateDisplayOptionsRange;
}

export class TicketMasterEventDateDisplayOptionsRange {
    localStartDate: string;
    localEndDate: string;
}

export class TicketMasterEventDateStatus {
    code: string;
}

export interface Event {
    id: string;
    type: string;
    name: string;
    locale: string;
    eventUrl: string;
    promoterId: number[];
    dates: {
        start: TicketMasterEventDate,
        end: TicketMasterEventDate,
        timezone: string;
        status: TicketMasterEventDateStatus,
        displayOptions: TicketMasterEventDateDisplayOptions
    };
}
