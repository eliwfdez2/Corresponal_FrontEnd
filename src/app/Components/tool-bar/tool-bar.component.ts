import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.css'
})
export class ToolBarComponent implements OnInit {
  @Output() navigationChange = new EventEmitter<string>();
  @Output() logoutRequest = new EventEmitter<void>();

  // This property will determine which link has the .active class
  currentActiveItem: string = 'dashboard';

  // User role
  userRole: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole();

    // Listen to route changes to update active item
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateActiveItem(event.url);
      });

    // Set initial active item based on current route
    this.updateActiveItem(this.router.url);
  }

  private updateActiveItem(url: string) {
    if (url.includes('/dashboard')) {
      this.currentActiveItem = 'dashboard';
    } else if (url.includes('/historial')) {
      this.currentActiveItem = 'historial';
    } else if (url.includes('/perfil')) {
      this.currentActiveItem = 'perfil';
    } else if (url.includes('/administrar-usuarios')) {
      this.currentActiveItem = 'administrar-usuarios';
    } else if (url.includes('/administrar-sistema')) {
      this.currentActiveItem = 'administrar-sistema';
    }
  }

  navigateTo(route: string, event: Event) {
    event.preventDefault();
    this.currentActiveItem = route;
    this.router.navigate([`/${route}`]);
    this.navigationChange.emit(route);
  }

  logout(event: Event) {
    event.preventDefault();
    this.logoutRequest.emit();
  }

  // Role-based access control methods
  isAdmin(): boolean {
    return this.userRole === 'Administrador';
  }
}