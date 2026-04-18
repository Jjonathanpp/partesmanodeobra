import { CommonModule, Location, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Empresa } from './empresa';
import { EmpresaService } from './empresa.service';

@Component({
  selector: 'app-empresa-detail',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, CommonModule, RouterModule],
  template: `
    <div *ngIf="empresa">

      <!-- Breadcrumb -->
      <nav aria-label="breadcrumb" class="mt-2">
        <ol class="breadcrumb justify-content-end mb-0">
          <li class="breadcrumb-item"><a routerLink="/">Home</a></li>
          <li class="breadcrumb-item"><a routerLink="/empresas">Empresas</a></li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ empresa.id ? empresa.nombre : 'Nuevo' }}
          </li>
        </ol>
      </nav>

      <!-- Card -->
      <div class="card shadow-sm mt-2">
        <div class="card-body">

          <!-- Header: título + botones -->
          <div class="d-flex align-items-center mb-3 gap-2">
            <h5 class="card-title mb-0 me-2">
              {{ empresa.id ? 'Editar Empresa' : 'Nueva Empresa' }}
            </h5>
            <button
              (click)="save()"
              [disabled]="form.invalid"
              class="btn btn-success btn-sm rounded-pill px-3">
              <i class="fas fa-save me-1"></i>Guardar
            </button>
            <button
              (click)="goBack()"
              class="btn btn-danger btn-sm rounded-pill px-3">
              <i class="fas fa-times me-1"></i>Cancelar
            </button>
          </div>

          <form #form="ngForm">

            <!-- Fila 1: Nombre + CUIT (Descripción) -->
            <div class="row align-items-center mb-2 g-2">
              <div class="col-auto">
                <span class="badge bg-secondary campo-label">Nombre</span>
              </div>
              <div class="col-md-4">
                <input
                  name="nombre"
                  placeholder="Nombre de la empresa"
                  class="form-control form-control-sm input-campo"
                  [(ngModel)]="empresa.nombre"
                  required
                  #nombre="ngModel"
                />
                <div *ngIf="nombre.invalid && (nombre.dirty || nombre.touched)"
                     class="text-danger small mt-1">
                  El nombre es requerido.
                </div>
              </div>

              <div class="col-auto ms-3">
                <span class="badge bg-secondary campo-label">Descripción</span>
              </div>
              <div class="col-md-4">
                <input
                  name="cuit"
                  placeholder="XX-XXXXXXXX-X"
                  class="form-control form-control-sm input-campo"
                  [(ngModel)]="empresa.cuit"
                  required
                  #cuit="ngModel"
                />
                <div *ngIf="cuit.invalid && (cuit.dirty || cuit.touched)"
                     class="text-danger small mt-1">
                  El CUIT es requerido.
                </div>
              </div>
            </div>

            <!-- Fila 2: Observaciones -->
            <div class="row align-items-center mb-2 g-2">
              <div class="col-auto">
                <span class="badge bg-secondary campo-label">Observaciones</span>
              </div>
              <div class="col">
                <input
                  name="observaciones"
                  placeholder="Observaciones de la empresa"
                  class="form-control form-control-sm input-campo"
                  [(ngModel)]="empresa.observaciones"
                />
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .campo-label {
      font-size: 0.78rem;
      min-width: 105px;
      text-align: center;
      background-color: #6c757d !important;
    }
    .input-campo {
      border-color: #4a90d9 !important;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  `]
})
export class EmpresaDetail {
  empresa!: Empresa;

  constructor(
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id === 'nuevo') {
      this.empresa = <Empresa>{};
    } else {
      this.empresaService
        .get(Number(id))
        .subscribe((dataPackage) => (this.empresa = <Empresa>dataPackage.data));
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.empresaService.save(this.empresa).subscribe((dataPackage) => {
      this.empresa = <Empresa>dataPackage.data;
      this.goBack();
    });
  }
}
