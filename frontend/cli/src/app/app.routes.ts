import { Routes } from '@angular/router';
import { EmpresaDetail } from './empresas/empresa-detail.component';
import { Empresas } from './empresas/empresa.component';
import { HomeComponent } from './home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'empresas', component: Empresas },
    { path: 'empresas/:id', component: EmpresaDetail }
];
