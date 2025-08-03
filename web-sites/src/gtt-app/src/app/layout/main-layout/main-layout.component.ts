import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
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

  public toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
