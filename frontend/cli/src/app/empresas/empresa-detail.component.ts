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
    <div *ngIf="empresa" class="mt-4">
      <!-- Top bar -->
      <div class="top-bar">
        <div class="top-bar-left">
          <span class="delivery-text">Delivery</span>
          <span class="module-box">Empresas (Clientes)</span>
        </div>
        <div class="top-bar-right breadcrumb-text">
          <a routerLink="/">Home</a> &gt; <a routerLink="/empresas">Empresas</a> &gt; <span>Nuevo</span>
        </div>
      </div>

      <!-- Header -->
      <div class="header-section mt-5 mb-5 d-flex align-items-center">
        <h2 class="mb-0 me-4">{{ empresa.id ? (empresa.nombre) : 'Nueva Empresa' }}</h2>
        <button (click)="save()" class="btn btn-guardar rounded-pill px-4 me-3" [disabled]="form.invalid">Guardar</button>
        <button (click)="goBack()" class="btn btn-cancelar rounded-pill px-4">Cancelar</button>
      </div>

      <!-- Form -->
      <form #form="ngForm">
        <div class="row mb-4 align-items-center">
          <div class="col-md-5 d-flex align-items-center">
            <span class="custom-label">Nombre</span>
            <input
              name="nombre"
              placeholder="Empresa con proyecto"
              class="form-control custom-input"
              [(ngModel)]="empresa.nombre"
              required
              #nombre="ngModel"
            />
          </div>
          <div class="col-md-5 d-flex align-items-center offset-md-1">
            <span class="custom-label">Descripción</span>
            <input
              name="cuit"
              placeholder="30-11111111-9"
              class="form-control custom-input"
              [(ngModel)]="empresa.cuit"
              required
              #cuit="ngModel"
            />
          </div>
        </div>
        <div class="row align-items-center mb-4">
          <div class="col-11 d-flex align-items-center">
            <span class="custom-label">Observaciones</span>
            <input
              name="observaciones"
              placeholder="Observaciones de la empresa"
              class="form-control custom-input w-100"
              [(ngModel)]="empresa.observaciones"
            />
          </div>
        </div>
      </form>
    </div>
  `,
  styles: `
    .top-bar {
      border: 2px solid black;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: white;
      margin-bottom: 2rem;
    }
    .top-bar-left {
      display: flex;
      align-items: center;
    }
    .delivery-text {
      font-size: 1.5rem;
      margin-right: 15px;
    }
    .module-box {
      background-color: #d3d3d3;
      border: 2px solid black;
      padding: 5px 10px;
      font-size: 0.9rem;
    }
    .breadcrumb-text a {
      text-decoration: underline;
      color: blue;
      cursor: pointer;
    }
    .btn-guardar {
      background-color: #93c47d;
      color: white;
      border: 2px solid black;
      font-weight: 500;
    }
    .btn-guardar:disabled {
      opacity: 0.6;
    }
    .btn-cancelar {
      background-color: #c27ba0;
      color: white;
      border: 2px solid black;
      font-weight: 500;
    }
    .custom-label {
      background-color: #a0a0a0;
      color: white;
      padding: 5px 15px;
      border-radius: 5px;
      font-weight: bold;
      font-size: 0.9rem;
      white-space: nowrap;
      margin-right: 15px;
      min-width: 120px;
      text-align: center;
    }
    .custom-input {
      border: 2px solid blue;
      border-radius: 0;
      padding: 5px 10px;
    }
    .custom-input:focus {
      box-shadow: none;
      border-color: darkblue;
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
