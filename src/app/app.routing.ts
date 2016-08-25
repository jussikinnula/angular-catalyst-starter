import { Routes, RouterModule }  from "@angular/router";

import { FrontpageRoutes, TodoRoutes } from "../views";

export const AppRoutes: Routes = [
    ...FrontpageRoutes,
    ...TodoRoutes
];

export const routing = RouterModule.forRoot(AppRoutes);