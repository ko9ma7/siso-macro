export class Reservation {
    id: number;
    place: string;
    dateTime: string;
    status: string;

    constructor(data: (string | null)[]) {
        const dateTime = (data[3] ?? '').replace(/\t/g, '');

        this.id = parseInt(data[0] ?? '');
        this.place = data[1] ?? '';
        this.dateTime = dateTime;
        this.status = data[6] ?? '';
    }
}