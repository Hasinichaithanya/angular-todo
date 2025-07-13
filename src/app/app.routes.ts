import { Routes } from '@angular/router';
import { UpdateTaskComponent } from './components/update-task-component/update-task-component';
import { LandingPageComponent } from './components/landing-page-component/landing-page-component';

export const routes: Routes = [
  {
    path: 'update-task/:id',
    component: UpdateTaskComponent,
  },
  {
    path: '',
    component: LandingPageComponent,
  },
];
