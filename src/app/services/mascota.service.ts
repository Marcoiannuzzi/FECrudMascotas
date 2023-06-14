import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Mascota } from '../interfaces/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  
private myAppURL: string = environment.endpoints
private myAPIURL: string = "api/Mascota/"
  constructor(private http: HttpClient) {  }

  getMascotas(): Observable<Mascota[]>{
    return this.http.get<Mascota[]>(`${this.myAppURL}${this.myAPIURL}`);
  };

  getMascotasById(id: number): Observable<Mascota>{
    return this.http.get<Mascota>(`${this.myAppURL}${this.myAPIURL}${id}`);
  }

  deleteMascota(id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppURL}${this.myAPIURL}${id}`);
  }

  addMascota(mascota: Mascota): Observable<Mascota>{
    return this.http.post<Mascota>(`${this.myAppURL}${this.myAPIURL}`, mascota);
  }
}
