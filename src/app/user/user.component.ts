import { Component, OnInit } from '@angular/core';
import { UserPath } from './user-path.enum';
import { UserService } from './user.service';

interface UserNavItem {
  readonly name: string;
  readonly icon: string;
  readonly link: string[];
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [ './user.component.scss' ]
})
export class UserComponent implements OnInit {
  userNavList: UserNavItem[];

  constructor(public userService: UserService) {
    this.userNavList = [
      {
        name: 'Summary',
        icon: 'table_chart',
        link: [ '/', UserPath.UserDashboard ]
      },
      {
        name: 'Tasks',
        icon: 'check_box',
        link: [ '/', UserPath.UserTasks ]
      },
      {
        name: 'Profile',
        icon: 'person',
        link: [ '/', UserPath.UserProfile ]
      },
      {
        name: 'View Options',
        icon: 'settings',
        link: [ '/', UserPath.ViewOptions ]
      }
    ];
  }

  ngOnInit(): void {
  }

}
