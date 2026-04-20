import { Injectable } from '@angular/core';
import { DataPackage } from '../data-package';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Tarea } from './tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private tareasUrl = 'api/tareas';

  constructor(private http: HttpClient) { }

  get(id: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.tareasUrl}/id/${id}`);
  }

  findByProyectoId(proyectoId: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.tareasUrl}/proyecto/${proyectoId}`);
  }

  save(tarea: Tarea): Observable<DataPackage> {
    return tarea.id ? this.http.put<DataPackage>(this.tareasUrl, tarea) : this.http.post<DataPackage>(this.tareasUrl, tarea);
  }

  remove(id: number): Observable<DataPackage> {
    return this.http.delete<DataPackage>(`${this.tareasUrl}/${id}`);
  }
}
