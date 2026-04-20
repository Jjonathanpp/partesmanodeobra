import { CommonModule, Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Empresa } from "./empresa";
import { EmpresaService } from "./empresa.service";

@Component({
  selector: "app-empresa-detail",
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div *ngIf="empresa" class="container mt-4">
      <!-- Miga de pan / Navegación Superior (Breadcrumbs) -->
      <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2 border-dark" style="border-width: 2px !important;">
        <h3 class="m-0 fw-normal">Delivery <span class="bg-light px-2 py-1 ms-2 border border-dark rounded" style="font-size: 0.9rem; font-weight: normal;">Empresas (Clientes)</span></h3>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb m-0" style="font-size: 0.9rem;">
            <li class="breadcrumb-item"><a href="#" class="text-decoration-none" routerLink="/">Home</a></li>
            <li class="breadcrumb-item"><a href="#" class="text-decoration-none" routerLink="/empresas">Empresas</a></li>
            <li class="breadcrumb-item active text-dark" aria-current="page">{{ empresa.id ? 'Editar' : 'Nuevo' }}</li>
          </ol>
        </nav>
      </div>

      <form #form="ngForm">
        <!-- Encabezado y botones -->
        <div class="d-flex align-items-center mb-4">
          <h4 class="m-0 me-4 fw-normal">{{ empresa.id ? empresa.nombre : 'Nueva Empresa' }}</h4>

          <button
            (click)="save()"
            class="btn rounded-pill px-4 me-2"
            [disabled]="form.invalid"
            style="background-color: #9bcc8f; border: 2px solid #000; color: #fff; font-weight: 500;"
          >
            Guardar
          </button>

          <button
            (click)="goBack()"
            class="btn rounded-pill px-4"
            style="background-color: #c98bb3; border: 2px solid #000; color: #fff; font-weight: 500;"
          >
            Cancelar
          </button>
        </div>

        <!-- Campos de entrada Nombre y CUIT en la misma fila -->
        <div class="row mb-3">
          <!-- Nombre -->
          <div class="col-md-6 d-flex align-items-center">
            <span class="badge text-bg-secondary rounded me-2 py-2 px-3" style="min-width: 100px; font-weight: normal; background-color: #a0a0a0 !important;">Nombre</span>
            <div class="flex-grow-1">
              <input
                name="nombre"
                placeholder="Razón Social"
                class="form-control input-blue-border"
                [(ngModel)]="empresa.nombre"
                required
                #nombre="ngModel"
              />
              <div *ngIf="nombre.invalid && (nombre.dirty || nombre.touched)" class="text-danger mt-1 small">
                <div *ngIf="nombre.errors?.['required']">La razón social es requerida.</div>
              </div>
            </div>
          </div>

          <!-- Descripción (CUIT) -->
          <div class="col-md-6 d-flex align-items-center mt-3 mt-md-0">
            <span class="badge text-bg-secondary rounded me-2 py-2 px-3" style="min-width: 100px; font-weight: normal; background-color: #a0a0a0 !important;">Descripción</span>
            <div class="flex-grow-1">
              <input
                name="cuit"
                placeholder="30-11111111-9"
                class="form-control input-blue-border"
                [(ngModel)]="empresa.cuit"
                required
                #cuit="ngModel"
              />
              <div *ngIf="cuit.invalid && (cuit.dirty || cuit.touched)" class="text-danger mt-1 small">
                <div *ngIf="cuit.errors?.['required']">El CUIT es requerido.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Campo Observaciones -->
        <div class="row mb-3 mt-4">
          <div class="col-12 d-flex align-items-start">
            <span class="badge text-bg-secondary rounded me-2 py-2 px-3 mt-1" style="min-width: 120px; font-weight: normal; background-color: #a0a0a0 !important;">Observaciones</span>
            <div class="flex-grow-1">
              <textarea
                name="observaciones"
                placeholder="Observaciones de la empresa"
                class="form-control input-blue-border"
                [(ngModel)]="empresa.observaciones"
                rows="2"
              ></textarea>
            </div>
          </div>
        </div>

      </form>
    </div>
  `,
  styles: `
    .input-blue-border {
      border: 2px solid #0000ff;
      border-radius: 0;
    }
    .input-blue-border:focus {
      border-color: #0000ff;
      box-shadow: none;
    }
    .breadcrumb-item + .breadcrumb-item::before {
      content: ">";
      color: #000;
      font-weight: bold;
    }
  `,
})
export class EmpresaDetailComponent implements OnInit {
  empresa!: Empresa;

  constructor(
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private location: Location,
  ) {}

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.empresaService.save(this.empresa).subscribe((dataPackage) => {
      this.empresa = <Empresa>dataPackage.data;
      this.goBack();
    });
  }

  get(): void {
    const id = this.route.snapshot.paramMap.get("id")!;
    if (id === "new") {
      this.empresa = <Empresa>{};
    } else {
      this.empresaService
        .get(Number(id))
        .subscribe((dataPackage) => (this.empresa = <Empresa>dataPackage.data));
    }
  }

  ngOnInit() {
    this.get();
  }
}
