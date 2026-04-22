import { CommonModule, Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Empresa } from "./empresa";
import { EmpresaService } from "./empresa.service";

@Component({
  selector: "app-empresa-detail",
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  template: `
    <div *ngIf="empresa" class="empresa-container">

      <!-- Top Delivery Navigation Bar -->
      <div class="delivery-navbar d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <span class="delivery-title me-4">Delivery</span>
          <div class="empresas-badge">Empresas (Clientes)</div>
        </div>
        <div class="breadcrumbs">
          <a routerLink="/" class="breadcrumb-link">Home</a> <strong>&gt;</strong>
          <a routerLink="/empresas" class="breadcrumb-link">Empresas</a> <strong>&gt;</strong>
          <span class="breadcrumb-current">{{ empresa.id ? 'Edición' : 'Nuevo' }}</span>
        </div>
      </div>

      <form #form="ngForm" class="mt-5">
        <!-- Title and Buttons Row -->
        <div class="d-flex align-items-center mb-5">
          <h2 class="mb-0 me-4 form-title">{{ empresa.id ? 'Editar Empresa' : 'Nueva Empresa' }}</h2>
          <button
            (click)="save()"
            class="btn custom-btn custom-btn-guardar me-3"
            [disabled]="form.invalid"
          >
            Guardar
          </button>
          <button type="button" (click)="goBack()" class="btn custom-btn custom-btn-cancelar">Cancelar</button>
        </div>

        <!-- Form Fields Row 1: Nombre and CUIT -->
        <div class="row mb-4">
          <div class="col-md-5 d-flex align-items-start">
            <span class="custom-label mt-1">Nombre</span>
            <div class="flex-grow-1">
              <input
                name="nombre"
                class="form-control custom-input"
                [(ngModel)]="empresa.nombre"
                required
                #nombre="ngModel"
              />
              <div *ngIf="nombre.invalid && (nombre.dirty || nombre.touched)" class="text-danger mt-1">
                <small *ngIf="nombre.errors?.['required']">El nombre es requerido.</small>
              </div>
            </div>
          </div>

          <div class="col-md-2"></div>

          <div class="col-md-5 d-flex align-items-start">
            <span class="custom-label mt-1">Descripción</span>
            <div class="flex-grow-1">
              <input
                name="cuit"
                class="form-control custom-input"
                [(ngModel)]="empresa.cuit"
                required
                #cuit="ngModel"
              />
              <div *ngIf="cuit.invalid && (cuit.dirty || cuit.touched)" class="text-danger mt-1">
                <small *ngIf="cuit.errors?.['required']">El CUIT es requerido.</small>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Fields Row 2: Observaciones -->
        <div class="row">
          <div class="col-md-10 d-flex align-items-start">
            <span class="custom-label mt-1">Observaciones</span>
            <div class="flex-grow-1">
              <textarea
                name="observaciones"
                class="form-control custom-input w-100"
                [(ngModel)]="empresa.observaciones"
                rows="1"
              ></textarea>
            </div>
          </div>
        </div>

      </form>
    </div>
  `,
  styles: `
    .delivery-navbar {
      border: 2px solid black;
      padding: 10px 20px;
      background-color: white;
      margin-bottom: 3rem;
    }
    .delivery-title {
      font-size: 1.6rem;
      font-weight: 400;
    }
    .empresas-badge {
      background-color: #d9d9d9;
      border: 2px solid black;
      padding: 4px 12px;
      font-size: 1rem;
      font-weight: 500;
    }
    .breadcrumbs {
      font-size: 1rem;
      color: black;
    }
    .breadcrumb-link {
      color: blue;
      text-decoration: underline;
      margin: 0 4px;
    }
    .breadcrumb-current {
      margin-left: 4px;
    }
    .form-title {
      font-weight: 400;
      font-size: 1.8rem;
    }
    .custom-btn {
      border: 2px solid black;
      border-radius: 20px;
      padding: 6px 20px;
      color: white;
      font-weight: 500;
      font-size: 1.1rem;
    }
    .custom-btn-guardar {
      background-color: #93c47d;
    }
    .custom-btn-guardar:hover {
      background-color: #7ab364;
      color: white;
    }
    .custom-btn-guardar:disabled {
      background-color: #c9e2c0;
      border-color: #666;
    }
    .custom-btn-cancelar {
      background-color: #c27ba0;
    }
    .custom-btn-cancelar:hover {
      background-color: #a66286;
      color: white;
    }
    .custom-label {
      background-color: #999999;
      color: white;
      border-radius: 5px;
      padding: 4px 12px;
      font-weight: bold;
      font-size: 0.9rem;
      text-align: center;
      margin-right: 15px;
      display: inline-block;
      white-space: nowrap;
    }
    .custom-input {
      border: 2px solid blue !important;
      border-radius: 0 !important;
      padding: 6px 12px;
      box-shadow: none !important;
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
