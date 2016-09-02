import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

// Shared pipes
import { PipesModule } from "../pipes/pipes.module";

import { FooterComponent } from "./footer";
import { HeaderComponent } from "./header";
import { TodoEditComponent } from "./todo-edit";
import { TodoListComponent } from "./todo-list";

const COMPONENTS: any[] = [
    FooterComponent,
    HeaderComponent,
    TodoEditComponent,
    TodoListComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule,
        PipesModule
    ],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ]
})
export class ComponentsModule {}