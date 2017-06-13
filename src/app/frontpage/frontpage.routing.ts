import { RouterModule } from '@angular/router';

import { FrontpageComponent } from './frontpage.component';

export const FrontpageRouting = RouterModule.forChild([
  {
    path: '',
    component: FrontpageComponent,
    pathMatch: 'full'
  }
]);
