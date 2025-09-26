import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlApiViviendo } from '../api-url';

@Injectable({ providedIn: 'root' })
export class CorresponsalService {
  private apiUrl = urlApiViviendo + '/usuarios';


  constructor(private http: HttpClient) {}

  crearCorresponsal(data: any): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.apiUrl, data, { headers });
  }

 getCorresponsalesActivos(): Observable<any[]> {
    const token = localStorage.getItem('token'); // O usa tu método de auth
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any[]>(this.apiUrl+'/corresponsales', { headers });
  }
}