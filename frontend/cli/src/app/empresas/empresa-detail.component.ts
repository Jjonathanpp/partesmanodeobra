import { CommonModule, Location, UpperCasePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Empresa } from "./empresa";
import { EmpresaService } from "./empresa.service";

@Component({
  selector: "app-empresa-detail",
  standalone: true,
  imports: [UpperCasePipe, FormsModule, CommonModule],
  template: `
    <div *ngIf="empresa">
      <h2>{{ empresa.id ? (empresa.nombre | uppercase) : 'NUEVA EMPRESA' }}</h2>
      <form #form="ngForm">
        <div class="mb-3">
          <label for="nombre" class="form-label">Razón Social:</label>
          <input
            name="nombre"
            placeholder="Razón Social"
            class="form-control"
            [(ngModel)]="empresa.nombre"
            required
            #nombre="ngModel"
          />
          <div
            *ngIf="nombre.invalid && (nombre.dirty || nombre.touched)"
            class="alert alert-danger mt-1"
          >
            <div *ngIf="nombre.errors?.['required']">
              La razón social es requerida.
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="cuit" class="form-label">CUIT:</label>
          <input
            name="cuit"
            placeholder="e.g., 30-12345678-9"
            class="form-control"
            [(ngModel)]="empresa.cuit"
            required
            #cuit="ngModel"
          />
          <div
            *ngIf="cuit.invalid && (cuit.dirty || cuit.touched)"
            class="alert alert-danger mt-1"
          >
             <div *ngIf="cuit.errors?.['required']">
               El CUIT es requerido.
             </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="observaciones" class="form-label">Observaciones:</label>
          <textarea
            name="observaciones"
            placeholder="Observaciones"
            class="form-control"
            [(ngModel)]="empresa.observaciones"
          ></textarea>
        </div>

        <button (click)="goBack()" class="btn btn-danger">Atrás</button>
        &nbsp;
        <button
          (click)="save()"
          class="btn btn-success"
          [disabled]="form.invalid"
        >
          Guardar
        </button>
      </form>
    </div>
  `,
  styles: ``,
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
