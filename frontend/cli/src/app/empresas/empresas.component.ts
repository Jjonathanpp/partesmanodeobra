import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Empresa } from "./empresa";
import { EmpresaService } from "./empresa.service";

@Component({
  selector: "app-empresas",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Empresas (Clientes)</h2>
    &nbsp;<a routerLink="/empresas/new" class="btn btn-success"
      >Nueva Empresa</a
    >
    <div class="table-responsive mt-3">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Razón Social</th>
            <th>CUIT</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let empresa of empresas; index as i">
            <td>{{ empresa.id }}</td>
            <td>{{ empresa.nombre }}</td>
            <td>{{ empresa.cuit }}</td>
            <td>
              <a routerLink="/empresas/{{ empresa.id }}" class="me-2"
                ><i class="fa fa-pencil"></i
              ></a>
              <a (click)="remove(empresa.id)" [routerLink]="" class="text-danger"
                ><i class="fa fa-remove" style="cursor:pointer;"></i
              ></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class EmpresasComponent implements OnInit {
  empresas: Empresa[] = [];

  constructor(private empresaService: EmpresaService) {}

  getEmpresas(): void {
    this.empresaService.all().subscribe((dataPackage) => {
      this.empresas = <Empresa[]>dataPackage.data;
    });
  }

  ngOnInit() {
    this.getEmpresas();
  }

  remove(id: number): void {
    if (confirm("¿Está seguro de que desea eliminar a la empresa? Si la elimina no podrá utilizarla luego.")) {
      this.empresaService.remove(id).subscribe(() => this.getEmpresas());
    }
  }
}
