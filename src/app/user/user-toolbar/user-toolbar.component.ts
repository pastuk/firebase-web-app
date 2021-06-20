import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

import { AdminPath } from '../../admin/admin-path.enum';
import { AuthPath } from '../../auth/auth-path.enum';
import { AuthService } from '../../auth/auth.service';
import { UserAccess } from '../user-access.enum';
import { UserPath } from '../user-path.enum';

interface MenuLink {
  type: UserAccess;
  name: string;
  icon: string;
  link: string[];
}

@Component({
  selector: 'app-user-toolbar',
  templateUrl: './user-toolbar.component.html',
  styleUrls: [ './user-toolbar.component.scss' ]
})
export class UserToolbarComponent implements OnInit {
  @Input() drawer: MatDrawer | undefined;
  extraLinks: MenuLink[];
  menuLinks: MenuLink[];
  homeLink: string[];

  constructor(private authService: AuthService) {
    this.homeLink = [ '/', UserPath.UserDashboard ];
    this.menuLinks = [
      {
        type: UserAccess.ReadWrite,
        name: 'Settings',
        icon: 'settings',
        link: [ '/', UserPath.UserProfile ]
      },
      {
        type: UserAccess.ReadWrite,
        name: 'Sign Out',
        icon: 'logout',
        link: [ '/', AuthPath.SignOut ]
      }
    ];
    this.extraLinks = [
      {
        type: UserAccess.NoAccess,
        name: 'Administrator',
        icon: 'supervisor_account',
        link: [ '/', AdminPath.AdminDashboard ]
      }
    ];
  }

  ngOnInit(): void {
    this.authService.checkPermissions();
    for (const menu of this.extraLinks) {
      menu.type = this.authService.permissions[menu.name] ?? UserAccess.NoAccess;
    }
  }

  hasAccess(menuType: UserAccess): boolean {
    return menuType > UserAccess.NoAccess;
  }

}
