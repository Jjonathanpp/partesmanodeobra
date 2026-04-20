import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataPackage } from '../data-package';
import { Proyecto } from './proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private proyectosUrl = "api/proyectos";

  constructor(private httpClient: HttpClient) { }

  all(): Observable<DataPackage> {
    return this.httpClient.get<DataPackage>(this.proyectosUrl);
  }

  get(id: number): Observable<DataPackage> {
    return this.httpClient.get<DataPackage>(`${this.proyectosUrl}/id/${id}`);
  }

  save(proyecto: Proyecto): Observable<DataPackage> {
    return proyecto.id
      ? this.httpClient.put<DataPackage>(this.proyectosUrl, proyecto)
      : this.httpClient.post<DataPackage>(this.proyectosUrl, proyecto);
  }

  remove(id: number): Observable<DataPackage> {
    return this.httpClient.delete<DataPackage>(`${this.proyectosUrl}/${id}`);
  }

  search(term: string): Observable<DataPackage> {
    return this.httpClient.get<DataPackage>(`${this.proyectosUrl}/search/${term}`);
  }
}
