import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { SharedModule } from "../shared/shared.module";

import { TodoComponent } from "./todo.component";
import { TodoRoutes } from "./todo.routing";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(TodoRoutes)
    ],
    declarations: [
        TodoComponent
    ]
})

export class TodoModule {}