import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Task} from '../../../core/constants/task.constant';
import {User} from '../../../core/constants/user.constant';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {NgFor, NgIf} from '@angular/common';
import {TasksService} from '../../../core/services/tasks.service';
import {RoleDirective} from '../../../directives/role.directive';

interface DialogData {
  users: User[];
  task?: Task;
}

@Component({
  selector: 'app-task-form',
  imports: [MatDialogModule, ReactiveFormsModule, MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule,
    NgIf,
    NgFor,
  RoleDirective],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  statusOptions = ['Pending', 'Completed', 'On Hold'];

  constructor(
    private fb: FormBuilder,
    private taskService: TasksService,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: [this.data.task?.name || '', Validators.required],
      description: [this.data.task?.description || '', Validators.required],
      status: [this.data.task?.status || 'pending', Validators.required],
      assignedTo: [this.data.task?.assignedTo._id || null] // Not required field
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    const taskData = this.taskForm.value;

    if (this.data.task) {
      // Update existing task
      this.taskService.updateTaskById(this.data.task._id, taskData).subscribe({
        next: (res: any) => this.dialogRef.close(res.data.task),
        error: () => console.error('Error updating task:')
      });
    } else {
      // Create new task
      this.taskService.createTask(taskData).subscribe({
        next: (res: any) => {
          this.dialogRef.close(res.data.task);
        },
        error: () => console.error('Error creating task:')
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
