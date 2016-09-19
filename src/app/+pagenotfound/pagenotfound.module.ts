import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { SharedModule } from "../shared/shared.module";

import { PageNotFoundComponent } from "./pagenotfound.component";
import { PageNotFoundRoutes } from "./pagenotfound.routing";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(PageNotFoundRoutes)
    ],
    declarations: [
        PageNotFoundComponent
    ]
})

export class PageNotFoundModule {}