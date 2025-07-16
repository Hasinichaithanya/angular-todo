import { Routes } from '@angular/router';
import { LandingPageComponent } from './todo_components/landing-page-component/landing-page-component';
import { UpdateTaskComponent } from './todo_components/update-task-component/update-task-component';
import { UserForm } from './user_profile_components/user-form/user-form';
export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'update-task/:id',
    component: UpdateTaskComponent,
  },
  {
    path: 'user-form',
    component: UserForm,
  },
];
