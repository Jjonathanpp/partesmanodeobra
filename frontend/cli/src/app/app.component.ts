import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <!-- Navbar Bootstrap -->
    <nav class="navbar navbar-expand-md navbar-dark bg-dark px-3">
      <a class="navbar-brand fw-bold" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
        <i class="fas fa-hard-hat me-2"></i>Partes MO
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
              <i class="fas fa-home me-1"></i>Inicio
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/empresas" routerLinkActive="active">
              <i class="fas fa-building me-1"></i>Empresas (Clientes)
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container mt-3">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .navbar-brand { letter-spacing: 0.5px; }
    .nav-link.active { font-weight: 600; }
  `],
})
export class AppComponent {
  title = 'cli';
}
