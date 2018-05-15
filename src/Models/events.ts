import { DateTime } from "ionic-angular";

export interface Event {
    id: string;
    title: string;
    descriptionShort: string;
    eventDate: DateTime;
    eventHour: DateTime;
    eventLocal: Location;
    photoURL: string;
    eventDateISO: DateTime;
}