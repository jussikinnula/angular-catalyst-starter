import { Routes } from "@angular/router";

declare var System: any;

export const AppRoutes: Routes = [
    { path: "", pathMatch: "full", loadChildren: "./+frontpage/index#FrontpageModule" },
    { path: "todo", loadChildren: "./+todo/index#TodoModule" },
    { path: "404", loadChildren: "./+pagenotfound/index#PageNotFoundModule" },
    { path: "**", pathMatch: "full", redirectTo: "/404" }
];
