import { Routes, RouterModule }  from "@angular/router";

import { TodoView } from "./todo.view";

export const TodoRoutes: Routes = [
    {
        path: "todo/:todo",
        component: TodoView
    },
    {
        path: "todo",
        component: TodoView
    }
];