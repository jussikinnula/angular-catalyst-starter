import { NgModule } from "@angular/core";

import { ComponentsModule } from "./components/components.module";
import { PipesModule } from "./pipes/pipes.module";
import { ServicesModule } from "./services/services.module";

@NgModule({
    imports: [
        ComponentsModule,
        PipesModule,
        ServicesModule
    ],
    exports: [
        ComponentsModule,
        PipesModule
    ]
})
export class SharedModule {}
