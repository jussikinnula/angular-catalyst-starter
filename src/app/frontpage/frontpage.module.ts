import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { FrontpageComponent } from './frontpage.component';
import { FrontpageRouting } from './frontpage.routing';

@NgModule({
  imports: [SharedModule, FrontpageRouting],
  declarations: [FrontpageComponent]
})

export class FrontpageModule {}
