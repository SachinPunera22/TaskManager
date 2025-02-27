import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {User} from '../../core/constants/user.constant';
import {RouterModule} from '@angular/router';
import {CreateTeamComponent} from '../teams/create-team/create-team.component';
import {UserService} from '../../core/services/user.service';

@Component({
  selector: 'app-users',
  imports: [RouterModule, MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule, NgClass, NgForOf, NgIf],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements AfterViewInit{
  displayedColumns: string[] = ['username', 'email', 'role', 'action'];
  dataSource!: MatTableDataSource<User>;
  roles: string[] = ['Employee', 'Team Lead', 'Manager'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  protected loading!: boolean;
  private users!: User[];
  private error!: string;

  constructor(public dialog: MatDialog, private userService: UserService) {

    this.getUsers();
  }

  getUsers(): void {
    this.loading = true;
    this.userService.getAllUser()
      .subscribe({
        next: (res) => {
          console.log('users:', res.data.users)
          this.users = res.data.users;
          this.dataSource = new MatTableDataSource(this.users);
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load users. Please try again later.';
          this.loading = false;
        }
      })
  }

  updateUserRole(userId: string, role: "Employee" | "Team Lead" | "Manager"): void {
    this.loading = true;
    this.userService.updateUserById(userId, {role})
      .subscribe({
        next: () => {
          const index = this.users.findIndex(u => u._id === userId);
          if (index !== -1) {
            this.users[index].role = role;
          }

          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to update role. Please try again later.';
          this.loading = false;
        }
      })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Update the openCreateTeamDialog method in users.component.ts
  openCreateTeamDialog() {
    // Navigate to the create team page
    this.dialog.open(CreateTeamComponent, {
      data: {users: this.users},
      height: '600px',
      width: '600px',

    });
  }
}
