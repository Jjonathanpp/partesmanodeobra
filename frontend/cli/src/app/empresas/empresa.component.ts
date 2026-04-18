import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataPackage } from '../data-package';
import { EmpresaService } from './empresa.service';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h4 class="mb-0">
        <i class="fas fa-building me-2 text-secondary"></i>Empresas (Clientes)
      </h4>
      <a routerLink="/empresas/nuevo" class="btn btn-success btn-sm rounded-pill px-3">
        <i class="fas fa-plus me-1"></i>Nueva Empresa
      </a>
    </div>

    <div class="card shadow-sm">
      <div class="table-responsive">
        <table class="table table-striped table-hover table-sm mb-0">
          <thead class="table-dark">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>CUIT</th>
              <th>Observaciones</th>
              <th class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let empresa of empresas">
              <td>{{ empresa.id }}</td>
              <td>{{ empresa.nombre }}</td>
              <td>{{ empresa.cuit }}</td>
              <td>{{ empresa.observaciones }}</td>
              <td class="text-center">
                <a routerLink="/empresas/{{ empresa.id }}"
                   class="btn btn-outline-primary btn-sm me-1"
                   title="Editar">
                  <i class="fas fa-edit"></i>
                </a>
                <button (click)="remove(empresa.id)"
                        class="btn btn-outline-danger btn-sm"
                        title="Eliminar">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
            <tr *ngIf="empresas.length === 0">
              <td colspan="5" class="text-center text-muted py-3">
                <i class="fas fa-inbox me-2"></i>No hay empresas registradas.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    th { font-size: 0.85rem; }
    td { vertical-align: middle; font-size: 0.88rem; }
  `]
})
export class Empresas {
  empresas: any[] = [];

  constructor(private empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresas(): void {
    this.empresaService.all().subscribe((dataPackage: DataPackage) => {
      this.empresas = dataPackage.data as any[];
    });
  }

  remove(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta empresa?')) {
      this.empresaService.remove(id).subscribe(() => this.getEmpresas());
    }
  }
}
