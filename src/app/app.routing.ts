import { RouterModule } from '@angular/router';
import { FrontpageModule } from './frontpage';
import { TodoModule } from './todo';
import { PageNotFoundModule } from './pagenotfound';

export const AppRouting = RouterModule.forRoot([
  { path: '', pathMatch: 'full', loadChildren: () => FrontpageModule },
  { path: 'todo', loadChildren: () => TodoModule },
  { path: '404', loadChildren: () => PageNotFoundModule },
  { path: '**', pathMatch: 'full', redirectTo: '/404' }
]);
