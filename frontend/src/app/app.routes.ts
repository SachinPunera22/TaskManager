import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { loggedInGuard } from './core/guards/logged-in.guard';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import {UsersComponent} from './components/users/users.component';
import {TaskComponent} from './components/tasks/task/task.component';
import {RoleGuard} from './core/guards/role.guard';

export const routes: Routes = [
    {
        path: "", component: AuthLayoutComponent, canActivate: [loggedInGuard], children: [
            { path: "", redirectTo: "login", pathMatch: 'full' },
            { path: "login", component: LoginComponent, title: "Login", },
            { path: "register", component: RegisterComponent, title: "Register", },
        ]
    },
    {
        path: "", component: MainLayoutComponent, canActivate: [authGuard], children: [
            { path: "", redirectTo: "tasks", pathMatch: 'full' },
            { path: "tasks", component: TaskComponent, title: "Tasks", },
            { path: "users", component: UsersComponent, canActivate:[RoleGuard], title: "Users", },

      ]
    },
    { path: "**", component: NotfoundComponent, title: "404" }
];
