import { Empresa } from '../empresas/empresa';

export interface Proyecto {
    id: number;
    codigo: string;
    descripcion: string;
    empresa: Empresa;
}
