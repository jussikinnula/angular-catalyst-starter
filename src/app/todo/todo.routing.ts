import { RouterModule } from '@angular/router';

import { TodoComponent } from './todo.component';

export const TodoRouting = RouterModule.forChild([
  {
    path: '',
    component: TodoComponent,
    pathMatch: 'full'
  },
  {
    path: ':todo',
    component: TodoComponent
  }
]);
