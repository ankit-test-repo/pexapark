import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FarmOutput, Windfarm} from '../model/windfarm';

@Injectable({
  providedIn: 'root'
})
export class WindfarmService {

  constructor(private http: HttpClient) {
  }

  getAllFarms(): Observable<Windfarm[]> {
    return this.http.get<Windfarm[]>('assets/data/windfarms.json');
  }

  getFarmOutput(farmId: string): Observable<FarmOutput> {
    const url = 'assets/data/' + farmId + '.json';
    return this.http.get<FarmOutput>(url);
  }
}
