import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataPackage } from '../data-package';
import { Empresa } from './empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private empresasUrl = "api/empresas";

  constructor(private httpClient: HttpClient) { }

  all(): Observable<DataPackage> {
    return this.httpClient.get<DataPackage>(this.empresasUrl);
  }

  get(id: number): Observable<DataPackage> {
    return this.httpClient.get<DataPackage>(`${this.empresasUrl}/id/${id}`);
  }

  save(empresa: Empresa): Observable<DataPackage> {
    return empresa.id
      ? this.httpClient.put<DataPackage>(this.empresasUrl, empresa)
      : this.httpClient.post<DataPackage>(this.empresasUrl, empresa);
  }

  remove(id: number): Observable<DataPackage> {
    return this.httpClient.delete<DataPackage>(`${this.empresasUrl}/${id}`);
  }

  byPage(page: number, size: number): Observable<DataPackage> {
    return this.httpClient.get<DataPackage>(
      `${this.empresasUrl}/page?page=${page - 1}&size=${size}`,
    );
  }

  search(searchTerm: string): Observable<DataPackage> {
    return this.httpClient.get<DataPackage>(`${this.empresasUrl}/search/${searchTerm}`)
  }
}
