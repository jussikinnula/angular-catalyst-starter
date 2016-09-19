import { Routes }  from "@angular/router";

import { PageNotFoundComponent } from "./pagenotfound.component";

export const PageNotFoundRoutes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: PageNotFoundComponent
    }
];