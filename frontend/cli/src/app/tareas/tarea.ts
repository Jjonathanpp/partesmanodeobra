import { Proyecto } from "../proyectos/proyecto";

export interface Tarea {
  id: number;
  codigo: string;
  descripcion: string;
  proyecto: Proyecto;
}
