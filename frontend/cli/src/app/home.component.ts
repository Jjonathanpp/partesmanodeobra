import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="row mt-5">
      <div class="col-md-8 offset-md-2 text-center">
        <div class="p-5 bg-light rounded-3 border shadow-sm">
          <h1 class="display-4 fw-bold">Bienvenido</h1>
          <p class="lead">Sistema de Gestión de Partes de Mano de Obra</p>
          <hr class="my-4">
          <p class="text-secondary">Selecciona una opción del menú para comenzar.</p>
          <a class="btn btn-primary btn-lg mt-3" routerLink="/empresas" role="button">
            <i class="fas fa-building me-2"></i>Ir a Empresas
          </a>
        </div>
      </div>
    </div>
  `,
  imports: [RouterModule]
})
export class HomeComponent {}
