import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {NgClass, NgIf} from "@angular/common";
import {RouterModule} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {User} from '../../../core/constants/user.constant';
import {UserService} from '../../../core/services/user.service';
import {Task} from '../../../core/constants/task.constant';
import {TasksService} from '../../../core/services/tasks.service';
import {TaskFormComponent} from '../task-form/task-form.component';


@Component({
  selector: 'app-task',
  imports: [
    RouterModule, MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule, NgClass, NgIf
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'description', 'status', 'assignedTo', 'createdBy', 'action'];
  dataSource: MatTableDataSource<Task>=new MatTableDataSource();
  statuses: string[] = ['Pending', 'Completed', 'On hold'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  protected loading!: boolean;
  private users!: User[];
  private tasks!: Task[];
  private error!: string;
  public selectedStatus: string='';

  constructor(public dialog: MatDialog, private userService: UserService, private taskService: TasksService) {
    this.getTasks();
    this.getUsers();
  }

  getTasks() {
    this.loading = true;
    this.taskService.getAllUserTasks().subscribe({
      next: (res: any) => {
        this.tasks = res.data.tasks; // Set tasks from API response
        this.dataSource = new MatTableDataSource(this.tasks || []);
        this.loading = false;

      },
      error: (err) => {
        this.loading = false;

        console.error('Error fetching tasks:', err);
      }
    });
  }

  getUsers(): void {
    this.loading = true;
    this.userService.getAllUser()
      .subscribe({
        next: (res) => {
          console.log('users:', res.data.users)
          this.users = res.data.users;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load tasks. Please try again later.';
          this.loading = false;
        }
      })
  }

  deleteTask(taskId: string) {
    this.loading = true;

    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task._id !== taskId); // Remove task locally
        console.log('Task deleted successfully');
        this.dataSource = new MatTableDataSource(this.tasks);
        this.loading = false;

      },
      error: (err) => {
        console.error('Error deleting task:', err);
        this.loading = false;
      }
    });
  }

  applyStatusFilter() {
    if (this.selectedStatus) {
      this.dataSource.data = this.tasks.filter(task => task.status === this.selectedStatus);
    } else {
      this.dataSource.data = this.tasks;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openTaskFormDialog(task?: Task) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: {task: task, users: this.users},
      height: '600px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: Task) => {
      console.log('task:',result)
      if (result) {
        if (task) {
          const index = this.tasks.findIndex(t => t._id === result._id);
          if (index !== -1) {
            this.tasks[index] = result;
          }
        } else {
          this.tasks.push(result);
        }
        this.selectedStatus='';
        this.dataSource.data=this.tasks;

      }
    });
  }
}
