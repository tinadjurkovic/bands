import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BandResponse } from './models/server';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { toBand, toBandResponse } from './models/mapping';
import { Band } from './models/client';
import { Place } from './models/place';
import { BandCreate } from './models/band-create';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class BandsService {

  private bandsSubject$ = new BehaviorSubject<Band[]>([]);

  constructor(private http: HttpClient) { }

  getBands() {
    return this.http.get<BandResponse[]>(`${BASE_URL}/bands`).pipe(
      map(bandResponses => bandResponses.map(bandResponse => toBand(bandResponse))),
      tap(bands => this.bandsSubject$.next(bands)),
    );
  }

  getBand(id: number): Observable<Band> {
    return this.http.get<BandResponse>(`${BASE_URL}/bands/${id}`).pipe(
      map(bandResponse => toBand(bandResponse)),
    );
  }

  updateBand(updatedBand: Band) {
    const bandResponse = toBandResponse(updatedBand);
    return this.http.put<BandResponse>(`${BASE_URL}/bands/${updatedBand.id}`, bandResponse).pipe(
      map(bandResponse => toBand(bandResponse)),
      tap(band => {
        const bands = this.bandsSubject$.getValue();
        const index = bands.findIndex(b => b.id === band.id);
        bands[index] = band;
        this.bandsSubject$.next(bands);
      }),
    );
  }

  deleteBand(id: number) {
    return this.http.delete(`${BASE_URL}/bands/${id}`).pipe(
      tap(() => {
        const bands = this.bandsSubject$.getValue();
        const index = bands.findIndex(b => b.id === id);
        bands.splice(index, 1);
        this.bandsSubject$.next(bands);
      }),
    );
  }

  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(`${BASE_URL}/places`);
  }

  createBand(newBand: BandCreate): Observable<any> {
    return this.http.post(`${BASE_URL}/bands`, newBand);
  }

}
