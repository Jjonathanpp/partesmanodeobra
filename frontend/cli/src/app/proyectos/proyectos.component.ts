import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Proyecto } from "./proyecto";
import { ProyectoService } from "./proyecto.service";

@Component({
  selector: "app-proyectos",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Proyectos</h2>
    &nbsp;<a routerLink="/proyectos/new" class="btn btn-success">Nuevo Proyecto</a>
    <div class="table-responsive mt-3">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Código</th>
            <th>Descripción</th>
            <th>Cliente</th>
            <th>CUIT</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let proyecto of proyectos">
            <td>{{ proyecto.id }}</td>
            <td>{{ proyecto.codigo }}</td>
            <td>{{ proyecto.descripcion }}</td>
            <td>{{ proyecto.empresa?.nombre }}</td>
            <td>{{ proyecto.empresa?.cuit }}</td>
            <td>
              <a routerLink="/proyectos/{{ proyecto.id }}" class="me-2">
                <i class="fa fa-pencil"></i>
              </a>
              <a (click)="remove(proyecto.id)" [routerLink]="" class="text-danger">
                <i class="fa fa-remove" style="cursor:pointer;"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class ProyectosComponent implements OnInit {
  proyectos: Proyecto[] = [];

  constructor(private proyectoService: ProyectoService) {}

  ngOnInit(): void {
    this.getProyectos();
  }

  getProyectos(): void {
    this.proyectoService.all().subscribe((dataPackage) => {
      this.proyectos = <Proyecto[]>dataPackage.data;
    });
  }

  remove(id: number): void {
    if (confirm("¿Está seguro de que desea eliminar el proyecto?")) {
      this.proyectoService.remove(id).subscribe(() => this.getProyectos());
    }
  }
}
