import { CommonModule, Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Empresa } from "../empresas/empresa";
import { EmpresaService } from "../empresas/empresa.service";
import { Proyecto } from "./proyecto";
import { ProyectoService } from "./proyecto.service";
import { Tarea } from "../tareas/tarea";
import { TareaService } from "../tareas/tarea.service";

@Component({
  selector: "app-proyecto-detail",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proyecto-detail.component.html',
  styles: ``,
})
export class ProyectoDetailComponent implements OnInit {
  proyecto!: Proyecto;
  empresaSearch: string = '';
  empresasSugeridas: Empresa[] = [];
  mostrarSugerencias: boolean = false;

  tareas: Tarea[] = [];
  nuevaTarea: Tarea = <Tarea>{};

  constructor(
    private route: ActivatedRoute,
    private proyectoService: ProyectoService,
    private empresaService: EmpresaService,
    private tareaService: TareaService,
    private location: Location,
  ) {}

  goBack(): void {
    this.location.back();
  }

  onSearchChange(): void {
    const term = this.empresaSearch.trim();
    if (term.length < 1) {
      this.empresasSugeridas = [];
      this.mostrarSugerencias = false;
      return;
    }
    this.empresaService.search(term).subscribe((dataPackage) => {
      this.empresasSugeridas = <Empresa[]>dataPackage.data;
      this.mostrarSugerencias = true;
    });
  }

  onBlur(): void {
    // Pequeño delay para que el mousedown del item pueda dispararse primero
    setTimeout(() => {
      this.mostrarSugerencias = false;
    }, 150);
  }

  seleccionarEmpresa(empresa: Empresa): void {
    this.proyecto.empresa = empresa;
    this.empresaSearch = empresa.nombre;
    this.empresasSugeridas = [];
    this.mostrarSugerencias = false;
  }

  save(): void {
    this.proyectoService.save(this.proyecto).subscribe((dataPackage) => {
      this.proyecto = <Proyecto>dataPackage.data;
      this.goBack();
    });
  }

  get(): void {
    const id = this.route.snapshot.paramMap.get("id")!;
    if (id === "new") {
      this.proyecto = <Proyecto>{};
    } else {
      this.proyectoService.get(Number(id)).subscribe((dataPackage) => {
        this.proyecto = <Proyecto>dataPackage.data;
        if (this.proyecto.empresa) {
          this.empresaSearch = this.proyecto.empresa.nombre;
        }
        this.cargarTareas(this.proyecto.id);
      });
    }
  }

  cargarTareas(proyectoId: number): void {
    if(!proyectoId) return;
    this.tareaService.findByProyectoId(proyectoId).subscribe(
      (dataPackage) => {
        this.tareas = <Tarea[]>dataPackage.data;
      }
    );
  }

  agregarTarea(): void {
    if (!this.proyecto.id) return;
    this.nuevaTarea.proyecto = this.proyecto;
    this.tareaService.save(this.nuevaTarea).subscribe(() => {
      this.nuevaTarea = <Tarea>{};
      this.cargarTareas(this.proyecto.id);
    });
  }

  eliminarTarea(tarea: Tarea): void {
    if (confirm(`¿Está seguro que desea eliminar la tarea ${tarea.codigo}?`)) {
      this.tareaService.remove(tarea.id).subscribe(() => {
        this.cargarTareas(this.proyecto.id);
      });
    }
  }

  ngOnInit(): void {
    this.get();
  }
}
