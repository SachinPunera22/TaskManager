import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {Router, RouterModule} from '@angular/router';
import {User} from '../../../core/constants/user.constant';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {NgForOf, NgIf} from '@angular/common';
import {TeamService} from '../../../core/services/team.service';

@Component({
  selector: 'app-create-team',
  imports: [ReactiveFormsModule, MatSnackBarModule, RouterModule, MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule, NgIf, NgForOf],
  templateUrl: './create-team.component.html',
  styleUrl: './create-team.component.scss'
})
export class CreateTeamComponent {
  teamForm!: FormGroup;
  teamLeaders: User[] = [];
  employees: User[] = [];
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<CreateTeamComponent>,
    public teamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: { users: User[] }
  ) {
    this.initializeForm();
    this.loadUsers();
  }


  initializeForm(): void {
    this.teamForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(500)]],
      teamLeaderId: [null, Validators.required],
      employeeIds: [[], Validators.required]
    });
  }

  loadUsers(): void {
    console.log('this.users:', this.users)

    this.users=this.data.users;
    // Filter users by role
    this.teamLeaders = this.users.filter(user =>
      user.role === 'Team Lead'
    );

    this.employees = this.users.filter(user =>
      user.role === 'Employee'
    );
  }

  onSubmit(): void {
    if (this.teamForm.invalid) {
      return;
    }

    const formValue = this.teamForm.value;


    // Create the team object
    const team = {
      name: formValue.name,
      description: formValue.description,
      teamLeader: formValue.teamLeaderId,
      employees: formValue.employeeIds
    };

    console.log('Team created:', team);
    this.teamService.createTeam(team).subscribe({
      next: () => {
        this.snackBar.open('Team created successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.dialogRef.close();
      }
    })

  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
