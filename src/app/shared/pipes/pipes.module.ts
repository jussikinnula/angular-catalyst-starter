import { NgModule } from "@angular/core";

import { DatePipe } from "./date.pipe";
import { OrderByPipe } from "./order-by.pipe";

const PIPES: any[] = [
    DatePipe,
    OrderByPipe
];

@NgModule({
    declarations: [
        ...PIPES
    ]
})
export class PipesModule {}
