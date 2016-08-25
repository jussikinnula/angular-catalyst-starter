import { NgModule } from "@angular/core";

import { DatePipe } from "./date.pipe";
import { OrderByPipe } from "./order-by.pipe";

@NgModule({
    declarations: [
        DatePipe,
        OrderByPipe
    ]
})
export class PipesModule {}
