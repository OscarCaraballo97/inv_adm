import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getMateriales(): Observable<any> {
    return this.http.get(`${this.apiUrl}/materiales`);
  }

  registrarSalida(id: number, cantidad: number, responsable: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/materiales/salida`, { id, cantidad, responsable });
  }
}
