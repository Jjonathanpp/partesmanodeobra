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
    <div *ngIf="empresa">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a routerLink="/">Home</a></li>
          <li class="breadcrumb-item"><a routerLink="/empresas">Empresas</a></li>
          <li class="breadcrumb-item active" aria-current="page">{{ empresa.id ? 'Editar' : 'Nuevo' }}</li>
        </ol>
      </nav>

      <div class="d-flex align-items-center mb-4">
        <h2 class="mb-0 me-3">{{ empresa.id ? empresa.nombre : 'Nueva Empresa' }}</h2>
        <button
          (click)="save()"
          class="btn btn-success me-2 rounded-pill px-4 custom-btn-guardar"
          [disabled]="form.invalid"
        >
          Guardar
        </button>
        <button (click)="goBack()" class="btn btn-secondary rounded-pill px-4 custom-btn-cancelar">
          Cancelar
        </button>
      </div>

      <form #form="ngForm">
        <div class="row mb-3">
          <div class="col-md-6 d-flex align-items-center">
            <label for="nombre" class="form-label me-2 mb-0 px-2 rounded custom-label">Nombre</label>
            <div class="flex-grow-1">
              <input
                name="nombre"
                placeholder="Empresa con proyecto"
                class="form-control border-primary"
                [(ngModel)]="empresa.nombre"
                required
                #nombre="ngModel"
              />
              <div
                *ngIf="nombre.invalid && (nombre.dirty || nombre.touched)"
                class="text-danger mt-1 small"
              >
                <div *ngIf="nombre.errors?.['required']">
                  El nombre es requerido.
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 d-flex align-items-center">
            <label for="cuit" class="form-label me-2 mb-0 px-2 rounded custom-label">CUIT</label>
            <div class="flex-grow-1">
              <input
                name="cuit"
                placeholder="30-11111111-9"
                class="form-control border-primary"
                [(ngModel)]="empresa.cuit"
                required
                #cuit="ngModel"
              />
              <div
                *ngIf="cuit.invalid && (cuit.dirty || cuit.touched)"
                class="text-danger mt-1 small"
              >
                 <div *ngIf="cuit.errors?.['required']">
                   El CUIT es requerido.
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-12 d-flex align-items-start">
            <label for="observaciones" class="form-label me-2 mb-0 px-2 rounded custom-label">Observaciones</label>
            <div class="flex-grow-1">
              <textarea
                name="observaciones"
                placeholder="Observaciones de la empresa"
                class="form-control border-primary"
                [(ngModel)]="empresa.observaciones"
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>

      </form>
    </div>
  `,
  styles: [`
    .custom-label {
      background-color: #a5a5a5;
      color: white;
      font-weight: bold;
      white-space: nowrap;
      min-width: 120px;
      text-align: center;
    }
    .form-control.border-primary {
      border: 2px solid blue !important;
      border-radius: 0;
    }
    .custom-btn-guardar {
      background-color: #92c78d;
      border: 2px solid black;
      color: white;
    }
    .custom-btn-cancelar {
      background-color: #c988ae;
      border: 2px solid black;
      color: white;
    }
  `],
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
