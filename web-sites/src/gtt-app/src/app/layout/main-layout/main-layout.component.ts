import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnInit {
  public isSidebarOpen: boolean = true;
  public userName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.internalInit();
  }

  public internalInit(): void {
    this.setUserName();
  }

  public setUserName(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.userName = JSON.parse(user!).name;
    }
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  public toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
