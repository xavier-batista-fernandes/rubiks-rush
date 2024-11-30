import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { Record } from '../models/Record';

@Injectable({
    providedIn: 'root',
})
export class SpeedcubingService {
    private readonly recordsSubject = new BehaviorSubject<Record[]>([]);
    private readonly records$ = this.recordsSubject.asObservable();

    private readonly http = inject(HttpClient);

    private readonly apiEndpoint: string = 'api/records';

    constructor() {
        this.fetchRecords();
    }

    getRecords(): Observable<Record[]> {
        return this.records$;
    }

    addRecord(record: Record) {
        this.saveRecord(record);
    }

    private fetchRecords() {
        console.log('Fetching Records from Speedcubing API...');

        this.http
            .get<Record[]>(this.apiEndpoint)
            .pipe(
                take(1),
                tap((records) => this.recordsSubject.next(records)),
                tap((records) => console.log(records))
            )
            .subscribe();
    }

    private saveRecord(record: Record) {
        this.http
            .post<Record>(this.apiEndpoint, record)
            .pipe(
                take(1),
                tap((res) => this.recordsSubject.next([...this.recordsSubject.value, res]))
            )
            .subscribe();
    }
}
