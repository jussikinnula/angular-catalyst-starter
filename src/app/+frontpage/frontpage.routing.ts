import { Routes }  from "@angular/router";

import { FrontpageComponent } from "./frontpage.component";

export const FrontpageRoutes: Routes = [
    {
        path: "",
        component: FrontpageComponent,
        pathMatch: "full"
    }
];