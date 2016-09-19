import { BrowserModule  } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

// App component
import { AppComponent } from "./app.component";

// Routing
import { AppRoutes } from "./app.routing";

// Shared components
import { SharedModule } from "./shared/shared.module";

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule,

        // App modules
        SharedModule,
        RouterModule.forRoot(AppRoutes)
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
