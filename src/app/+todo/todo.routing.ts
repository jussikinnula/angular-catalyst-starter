import { Routes, RouterModule }  from "@angular/router";

import { TodoComponent } from "./todo.component";

export const TodoRoutes: Routes = [
    {
        path: "",
        component: TodoComponent,
        pathMatch: "full"
    },
    {
        path: ":todo",
        component: TodoComponent
    }
];