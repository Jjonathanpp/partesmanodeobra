import { Routes } from '@angular/router';
import { EmpresaDetailComponent } from './empresas/empresa-detail.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { HomeComponent } from './home.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ProyectoDetailComponent } from './proyectos/proyecto-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'empresas', component: EmpresasComponent },
    { path: 'empresas/:id', component: EmpresaDetailComponent },
    { path: 'proyectos', component: ProyectosComponent },
    { path: 'proyectos/:id', component: ProyectoDetailComponent }
];
