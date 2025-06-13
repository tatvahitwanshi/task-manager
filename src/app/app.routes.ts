import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { TaskListComponent } from './modules/tasks/task-list/task-list.component';
import { TaskCreateComponent } from './modules/tasks/task-create/task-create.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { LogoutComponent } from './modules/auth/logout/logout.component';
import { ErrorComponent } from './modules/error/error.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'create-task', component: TaskCreateComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'error', component: ErrorComponent }
];
